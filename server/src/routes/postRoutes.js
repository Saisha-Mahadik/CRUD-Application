const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});


const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts); 
    } catch (err) {
        console.error('Error in GET /api/posts:', err);
        res.status(500).json({ error: err.message });
    }
});


router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        const post = new Post({
            title,
            description,
            image: req.file ? req.file.path : null, 
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error('Error in POST /api/posts:', err);
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedData = { title, description };
        if (req.file) updatedData.image = req.file.path;

        const post = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
