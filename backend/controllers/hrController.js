import mongodb from '../db/mongodb.js';
import HRModel from '../models/HR.js';
import bcrypt from 'bcryptjs';

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const db = await mongodb.connectToDatabase();
    const existingUser = await db.collection(HRModel.hrCollectionName).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await db.collection(HRModel.hrCollectionName).insertOne(newUser);
    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const db = await mongodb.connectToDatabase();
    const user = await db.collection(HRModel.hrCollectionName).findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // For simplicity, we are not issuing a JWT token here.
    // In a real app, you would issue a token upon successful login.
    res.status(200).json({ success: true, message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { signUp, login }; 