import mongoose from "mongoose";

export const uri = "mongodb+srv://krithidk:LearnMongo25@cluster0.rm3jlct.mongodb.net/yourdbname?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDb"))
.catch((err) => console.log(`Connection failed due to this error: ${err}`));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'company'] }
});

userSchema.virtual('confirm_password')
  .get(function() { return this._confirm_password; })
  .set(function(value) { this._confirm_password = value; });

userSchema.pre('save', function(next) {
  if (this.password !== this._confirm_password) {
    return next(new Error('Passwords do not match'));
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
