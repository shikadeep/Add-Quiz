const express = require('express');
const router = express.Router();
const Quiz = require('../Models/Quiz');

router.get('/view', async (req, res)=>{
    try{
        const newdata = await Quiz.find()
    res.status(200).json({succes: true, message: "newdata" , data: newdata
    })
    }
    catch(err){
        res.status(500).json({
            error: 'Failed to create quiz', details: err.message 
        })
    }
})

router.post('/add', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ message: 'Quiz created', quiz });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create quiz', details: err.message });
    }
});

module.exports = router;
