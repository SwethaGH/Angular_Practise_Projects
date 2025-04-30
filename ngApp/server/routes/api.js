const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb+srv://ssdptangudubilli:7eNCWfIesJKT2W2K@cluster0.yesijzu.mongodb.net/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

router.get('/', function(_req, res){
    res.send('api works');
});
router.get('/videos', (_req, res) => {
    console.log("Get request for all videos");
    Video.find({})
      .then(videos => res.json(videos))
      .catch(err => {
        console.error("Error retrieving videos", err);
        res.status(500).send("Internal Server Error");
      });
  });
  
  
router.get('/videos/:id', (req, res) => {
    console.log("Get request for a single video");
    Video.findById(req.params.id)
      .then(video => res.json(video))
      .catch(err => {
        console.error("Error retrieving video", err);
        res.status(500).send("Internal Server Error");
      });
  });
  

  
  router.post('/video', async (req, res) => {
    console.log("Posted a single video");
    try {
      const newVideo = new Video({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      });
      const insertedVideo = await newVideo.save();
      res.json(insertedVideo);
    } catch (err) {
      console.error("Error saving video:", err);
      res.status(500).send("Error saving video");
    }
  });


  router.put('/video/:id', async (req, res) => {
    console.log("Updating a single video");
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          url: req.body.url,
          description: req.body.description
        },
        { new: true } // this returns the updated document
      );

      if (!updatedVideo) {
        return res.status(404).send("Video not found");
      }
      res.json(updatedVideo);
    } catch (err) {
      console.error("Error updating video:", err);
      res.status(500).send("Error updating video");
    }
  });
  
  router.delete('/video/:id', async (req, res) => {
    console.log("Deleting a single video");
    try {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);
      if (!deletedVideo) {
        return res.status(404).send("Video not found");
      }
      res.json({ message: "Video deleted successfully", deletedVideo });
    } catch (err) {
      console.error("Error deleting video:", err);
      res.status(500).send("Error deleting video");
    }
  });
  

module.exports = router;

