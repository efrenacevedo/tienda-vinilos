import { useState, useEffect } from 'react';

interface Song {
  idSong: number;
  name_song: string;
  description_song: string;
  duration: number;
  file_mp3: string;
}

export default function View() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('/api/getSongs');
      const data = await response.json();
      setSongs(data);
    };

    fetchSongs();
  }, []);

  const playAudio = (audioFile: string) => {
    const audioPlayer = document.getElementById('audio_player') as HTMLAudioElement;
    const audioSource = document.getElementById('audio_source') as HTMLSourceElement;
    audioSource.src = audioFile;
    audioPlayer.load();
    audioPlayer.play();
  };

  return (
    <div>
      <h1>Canciones</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Duración</th>
            <th>Reproducir</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.idSong}>
              <td>{song.idSong}</td>
              <td>{song.name_song}</td>
              <td>{song.description_song}</td>
              <td>{song.duration}</td>
              <td>
                <button onClick={() => playAudio(`data:audio/mpeg;base64,${song.file_mp3}`)}>
                  Reproducir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <audio id="audio_player" controls>
        <source id="audio_source" src="" type="audio/mpeg" />
        Tu navegador no soporta la reproducción de audio.
      </audio>
    </div>
  );
}
