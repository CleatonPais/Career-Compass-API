import User from "../models/User.js";
import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user, company;

    if (role === "candidate") {
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } else if (role === "company") {
      company = await Company.findOne({ email });
      if (company) {
        return res.status(400).json({ msg: "Company already exists" });
      }

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      company = new Company({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await company.save();

      const payload = {
        user: {
          id: company.id,
          role: company.role,
        },
      };

      jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } else {
      return res.status(400).json({ msg: "Invalid role" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let company = await Company.findOne({ email });

    console.log(`User found: ${user}`);
    console.log(`Company found: ${company}`);

    if (!user && !company) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    let entity = user || company;
    console.log(`Entity selected: ${entity}`);

    console.log(password + ` : ` + entity.password);

    let isMatch = await bcrypt.compare(password, entity.password);
    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: entity.id,
        role: entity.role,
      },
    };

    jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    let user = await User.findOne({ email });
    let company = await Company.findOne({ email });

    if (!user && !company) {
      return res.status(400).json({ msg: "User not found" });
    }

    const entity = user || company;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`New hashed password: ${hashedPassword}`);

    entity.password = hashedPassword;
    console.log(entity);
    await entity.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
