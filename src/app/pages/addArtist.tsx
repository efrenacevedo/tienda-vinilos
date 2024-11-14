import { useState } from 'react';

export default function Add() {
  const [name_artist, setNameArtist] = useState('');
  const [last_name_artist, setLastNameArtist] = useState('');
  const [description_artist, setDescriptionArtist] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/addArtist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name_artist, last_name_artist, description_artist, age, country }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Artista agregado con éxito');
      setNameArtist('');
      setLastNameArtist('');
      setDescriptionArtist('');
      setAge(undefined);
      setCountry('');
    } else {
      alert('Error al agregar artista');
    }
  };

  return (
    <div>
      <h1>Agregar Artista</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={name_artist} onChange={(e) => setNameArtist(e.target.value)} required /><br />
        <label>Apellido:</label>
        <input type="text" value={last_name_artist} onChange={(e) => setLastNameArtist(e.target.value)} /><br />
        <label>Descripción:</label>
        <textarea value={description_artist} onChange={(e) => setDescriptionArtist(e.target.value)} required></textarea><br />
        <label>Edad:</label>
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /><br />
        <label>País:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required /><br />
        <button type="submit">Agregar Artista</button>
      </form>
    </div>
  );
}
