import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function register(req, res) {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: 'Name and password are required' });
        }

        const existingUser = await User.findOne({ where: { name } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Creation successful', username: user.name,  });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

async function login(req, res) {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: 'Name and password are required' });
        }

        const user = await User.findOne({ where: { name } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }  
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 3600000,
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { register, login };