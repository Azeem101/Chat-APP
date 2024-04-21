import jwt from "jsonwebtoken";

const generateTokenAndGetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY_JWT, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.MODE_ENV !== 'development'
    });
};

export default generateTokenAndGetCookie;
