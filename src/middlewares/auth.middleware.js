import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract the cookie string from the request headers
        const cookieString = req.header("cookie");

        console.log("Cookie string:", cookieString); // For debugging purposes

        // Check if the cookie string exists
        if (!cookieString) {
            throw new ApiError(401, "Unauthorized request: No cookies found");
        }

        // Parse the cookie string to extract the accessToken
        const cookies = cookieString.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});

        const token = cookies.accessToken; // Extract the accessToken

        console.log("Extracted accessToken:", token); // For debugging purposes

        // Check if the token exists
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No access token found in cookies");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // Check if the user exists
        if (!user) {
            throw new ApiError(401, "Invalid Access Token: User not found");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});