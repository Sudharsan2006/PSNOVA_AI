const dns = require('dns');
const mongoose = require('mongoose');

// Force Google DNS to resolve MongoDB Atlas SRV records
// (ISP/default DNS may not support SRV lookups)
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * Connect to MongoDB Atlas
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
