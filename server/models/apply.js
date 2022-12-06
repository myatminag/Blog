import mongoose from 'mongoose';

const applySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true
    },
    educational: {
        type: String,
        required: true
    },
    topics: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }, 
    summary: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Apply = mongoose.model('Apply', applySchema);

export default Apply;