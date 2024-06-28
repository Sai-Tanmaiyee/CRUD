const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description, category, deadline } = req.body;
    try {
        const task = new Task({ title, description, category, deadline });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async(req, res) => {
    const { category, deadline } = req.query;
    const filter = {};

    if(category){
        filter.category = category;
    }
    if(deadline){
        filter.deadline = deadline;
    }

    try {
        const task = await Task.find(filter);
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({message:error.message})
    }
})

router.put('/:id', async (req, res) => {
    const { title, description, category, deadline } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { title, description, category, deadline }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
