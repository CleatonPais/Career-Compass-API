import mongoose from "mongoose";

const UserSessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    required: true,
  },
  auth_token: {
    type: String,
    required: true,
  },
  request_date: {
    type: Date,
    default: Date.now,
  },
});

const UserSession = mongoose.model("UserSession", UserSessionSchema);

export default UserSession;
