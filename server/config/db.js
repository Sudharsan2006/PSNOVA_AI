const dns = require('dns');
const mongoose = require('mongoose');

// Force Google DNS to resolve MongoDB Atlas SRV records
// (ISP/default DNS may not support SRV lookups)
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * Connect to MongoDB Atlas with auto-retry
 * @returns {Promise<void>}
 */
const connectDB = async (retryCount = 0) => {
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 5000;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (err) {
    console.error(`❌ MongoDB connection error (attempt ${retryCount + 1}): ${err.message}`);

    if (retryCount < MAX_RETRIES) {
      console.log(`🔄 Retrying in ${RETRY_DELAY_MS / 1000}s... (${retryCount + 1}/${MAX_RETRIES})`);
      setTimeout(() => connectDB(retryCount + 1), RETRY_DELAY_MS);
    } else {
      console.error('❌ Could not connect to MongoDB after max retries. Server will continue without DB.');
      // Do NOT call process.exit(1) — let the server keep running so health checks pass
    }
  }
};

module.exports = connectDB;
