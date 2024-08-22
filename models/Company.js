import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "company"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

companySchema
  .virtual("confirm_password")
  .get(function () {
    return this._confirm_password;
  })
  .set(function (value) {
    this._confirm_password = value;
  });

// companySchema.pre('save', async function(next) {
//   if (this.password !== this._confirm_password) {
//     return next(new Error('Passwords do not match'));
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const Company = mongoose.model("Company", companySchema);

export default Company;
