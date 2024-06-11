import CompanyProfile from "../models/CompanyProfile.js";
import { validationResult } from "express-validator";

export const createCompanyProfile = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const { companyName, companyLogo, industry, companyDescription, address } = req.body;
    // Automatically taken from the authenticated user
    const userId = req.user.id; 

    try{
        const profile = new CompanyProfile({
            userId,
            companyName,
            companyLogo,
            industry,
            companyDescription,
            address,
        });
        await profile.save();
        res.status(201).json(profile);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server error")
    }

}

export const getCompanyProfile = async (req, res) => {
    try {
      const profile = await CompanyProfile.findOne({ userId: req.user.id }).populate("userId", ["name", "email"]);
      if (!profile) {
        return res.status(404).json({ msg: "Profile not found" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
