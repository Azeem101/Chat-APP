import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import generateTokenAndGetCookie from '../utlis/generateToken.js';

export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username);

        const user = await userModel.findOne({ username });

        const confirmPassword = await bcrypt.compare(password, user?.password);
        if (!user || !confirmPassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndGetCookie(user._id, res);
        res.status(200).json({
            success: true,
            message: "User Logged-in Successfully",
            _id: user._id,
            user,
        });
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "Error in authLogin",
        });
    }
};

export const authLogout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const authSignup = async (req, res) => {
    try {
        const { fullname, username, password, gender } = req.body;
        console.log(fullname, username, password, gender);

        const user = await userModel.findOne({ username });

        if (user) {
            return res.status(200).send({ error: "User Already Exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new userModel({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            await generateTokenAndGetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).send({
                _id: newUser._id,
                newUser,
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Invalid user data",
            });
        }
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "Error in auth Sign up",
        });
    }
};
