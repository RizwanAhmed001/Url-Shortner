import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image Is Required!" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must include uppercase, lowercase, number & special character",
      });
    }

    const emailExist = await UserModel.exists({ email });

    if (emailExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email Is Already In Use!" });
    }

    let result;

    try {
      result = await cloudinary.uploader.upload(image.path);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    } finally {
      if (fs.existsSync(image.path)) {
        fs.unlinkSync(image.path);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      profile: result.secure_url,
    });

    await newUser.save();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
      user: { name: newUser.name, image: newUser.profile },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message + "gfvdhg" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Login Successfully!",
        user: { name: user.name, image: user.profile },
        token,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
