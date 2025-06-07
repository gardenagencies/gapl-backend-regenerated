import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['admin', 'agent', 'corporate'], default: 'agent' },
    password: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
