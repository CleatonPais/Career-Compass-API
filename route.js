import express from 'express';
import bcrypt from 'bcrypt';
import User from './Models/userModel.js';
import Company from './Models/companyModel.js';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirm_password, role } = req.body;

    if (role === 'user') {
      // Create a new user instance
      const user = new User({ name, email, password, role });
      user.confirm_password = confirm_password;
      user.password = await bcrypt.hash(user.password, 10);

      await user.save();
      res.status(201).send('User registered successfully');
    } else if (role === 'company') {
      // Create a new company instance
      const company = new Company({ name, email, password, role });
      company.confirm_password = confirm_password;

      company.password = await bcrypt.hash(company.password, 10);
      await company.save();
      res.status(201).send('Company registered successfully');
    } else {
      res.status(400).send('Invalid role specified');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
