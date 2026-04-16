const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');

const promptRoutes = require('./routes/promptRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/prompts', promptRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log('No MONGODB_URI found. Starting in-memory MongoDB instance...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`Connected to MongoDB at ${mongoUri}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
