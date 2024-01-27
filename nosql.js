import express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/webform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    gender: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "public/index.html");
});

app.post('/submit', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age, gender, comments } = req.body;

    const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        gender,
    });

    try {
        const savedUser = await user.save();
        console.log('User data inserted :', savedUser);
        res.status(201).json({ message: 'Data inserted ' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
