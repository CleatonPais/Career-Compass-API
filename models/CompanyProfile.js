import mongoose from 'mongoose';

const CompanyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  companyLogo: {
    type: String,
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

export default mongoose.model('CompanyProfile', CompanyProfileSchema);
