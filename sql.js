import express from "express";
import mysql from "mysql2/promise";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysqlpasskey',
    database: 'webform1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/submit', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age, gender } = req.body;

    try {
        const connection = await pool.getConnection();

        const [results] = await connection.query(
            'INSERT INTO users (firstName, lastName, email, phoneNumber, age, gender) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phoneNumber, age, gender]
        );

        connection.release();

        console.log('User data inserted into MySQL:', results);
        res.status(201).json({ message: 'Data inserted' });
    } catch (error) {
        console.error('MySQL error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
