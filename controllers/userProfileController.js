import UserProfile from "../models/UserProfile.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have a middleware to extract user ID from token
    const userProfile = await UserProfile.findOne({ user: userId }).populate("user", ["name", "email"]);

    if (!userProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const updateProfile = async (req, res) => {
  const { bio, jobTitle, company, location, linkedinUrl, skills } = req.body;
  const userId = req.user.id; // Assuming you have a middleware to extract user ID from token

  try {
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: { bio, jobTitle, company, location, linkedinUrl, skills, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
