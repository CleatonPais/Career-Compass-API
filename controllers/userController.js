import User from '../models/User.js';
import Company from '../models/Company.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user, company;

    if (role === 'candidate') {
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        role
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        'yourSecretKey',
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else if (role === 'employer') {
      company = await Company.findOne({ email });
      if (company) {
        return res.status(400).json({ msg: 'Company already exists' });
      }

      company = new Company({
        name,
        email,
        password,
        role
      });

      await company.save();

      const payload = {
        user: {
          id: company.id,
          role: company.role
        }
      };

      jwt.sign(
        payload,
        'yourSecretKey',
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      return res.status(400).json({ msg: 'Invalid role' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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

    if (!user && !company) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    let isMatch;
    let role;

    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
      role = user.role;
    } else {
      isMatch = await bcrypt.compare(password, company.password);
      role = company.role;
    }

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user ? user.id : company.id,
        role: role
      }
    };

    jwt.sign(
      payload,
      'yourSecretKey',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const forgotPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ email });
    let company = await Company.findOne({ email });

    if (!user && !company) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (user) {
      user.password = hashedPassword;
      await user.save();
    } else {
      company.password = hashedPassword;
      await company.save();
    }

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
