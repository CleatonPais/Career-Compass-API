import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());

mongoose.connect('yourMongoDBConnectionURL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error(err.message);
});

app.use('/api/users', userRoutes);

export default app;
