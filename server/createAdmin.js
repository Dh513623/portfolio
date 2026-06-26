const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = new User({
      email: process.env.DEFAULT_ADMIN_EMAIL || 'priyadharshinim23cseb21@gmail.com',
      password: process.env.DEFAULT_ADMIN_PASSWORD || '23cseb21'
    });

    await user.save();

    console.log('Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();