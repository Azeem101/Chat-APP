import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilepic: {
        type: String,
        default: "",
    },
},
    { timestamps: true }
);

const User = model("User", userSchema);

export default User;
