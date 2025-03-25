import jwt from "jsonwebtoken";
import Alumni from "../models/Alumni.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        // console.log("Token received in middleware:", token); // Debugging


        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in environment variables.");
            return res.status(500).json({ message: "Server configuration error." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded); // Debugging
        // console.log("JWT_SECRET in use:", process.env.JWT_SECRET);


        const alumni = await Alumni.findOne({ idNo: decoded.idNo });
        if (!alumni) {
            return res.status(404).json({ message: "Invalid token. User not found." });
        }

        req.user = alumni;
        next();
    } catch (error) {
        console.error("Auth error:", error.message); // Debugging

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        } else {
            return res.status(403).json({ message: "Unauthorized request." });
        }
    }
};

export default authMiddleware;
