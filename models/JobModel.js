import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  location: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
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
  creation_date: {
    type: Date,
    default: Date.now
  },
  expiry_date: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    enum: ["fulltime", "parttime", "seasonal", "contract"],
    required: true,
  },
  salary: {
    type: String, 
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
