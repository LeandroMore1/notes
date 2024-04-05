import mysql from 'mysql2'

const connection = mysql.createPool({
    host:'localhost',
    database: 'notes',
    user: 'root',
    password: 'password'
}).promise()


export default connection