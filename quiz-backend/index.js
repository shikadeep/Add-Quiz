const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db'); // MongoDB connection file

const QuizRouter = require('./routes/QuizRouter');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json()); // 👈 This should be a function call with ()

app.use('/api/quiz', QuizRouter);

app.get('/', (req, res)=>{
    res.send("hello welcome jiii");
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
