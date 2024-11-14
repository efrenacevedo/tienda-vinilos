import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'tuservidor',
  user: 'tuusuario',
  password: 'tucontraseña',
  database: 'tubasededatos',
});

export default connection;
