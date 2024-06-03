import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'company'] }
});

companySchema.virtual('confirm_password')
  .get(function() { return this._confirm_password; })
  .set(function(value) { this._confirm_password = value; });

companySchema.pre('save', function(next) {
  if (this.password !== this._confirm_password) {
    return next(new Error('Passwords do not match'));
  }
  next();
});

const Company = mongoose.model('Company', companySchema);

export default Company;
