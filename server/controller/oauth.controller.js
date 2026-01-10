const axios = require("axios");
const User = require("../model/user.model");
const { createAndSendToken } = require("./auth.controller");
const AppError = require("../utils/Apperror");

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

// ქმნის URL ს რომლის მეშვეობითაც გადავალ email submit page ზე
const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid profile email",
        access_type: "offline",
        prompt: "consent",
    });

    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
};

// არის ფუნქცია რომელიც მეხმარენა რომ სწორად დავადასტურო email
const googleCallBack = async (req, res, next) => {
    try {
        const { code } = req.query;
        const tokenResponse = await axios.post(
            GOOGLE_TOKEN_URL,
            new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token } = tokenResponse.data;

        const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const { sub, email, name, picture, email_verified } = userInfo.data;

        const user = await User.findOne({ oauthID: sub, email });

        if (user) {
            return createAndSendToken(user, 200, res);
        }

        if (!email_verified) {
            return next(new AppError("Google account is not verified", 400));
        }

        const newUser = await User.create({
            oauthID: sub,
            fullname: name,
            email,
            avatar: picture,
            oauthProvider: "google",
            isVerified: true,
        });

        createAndSendToken(newUser, 201, res)

        return res.redirect(process.env.FRONTEND_URL + "/panel")
    } catch (err) {
        console.log("error is in googleCallBack function: ", err);
    }
};

module.exports = {
    getGoogleAuthUrl,
    googleCallBack,
};
