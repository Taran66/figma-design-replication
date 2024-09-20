const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection string
const uri = 'mongodb://localhost:27017/your_database_name';

app.post('/submit-form', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('your_database_name');
    const collection = database.collection('form_submissions');
    
    const formData = {
      name: req.body.name,
      email: req.body.email,
      countryCode: req.body.countryCode,
      mobile: req.body.mobile,
      babyStage: req.body.babyStage,
      submittedAt: new Date()
    };
    
    const result = await collection.insertOne(formData);
    
    await client.close();
    
    res.status(201).json({ message: 'Form submitted successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});