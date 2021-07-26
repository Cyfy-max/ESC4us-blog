const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pusher = require("pusher");
const Vote = require('../models/Vote')
const pusher = new Pusher({
  appId: "1220409",
  key: "93424883ff8e56f9d55a",
  secret: "3fd806ab01a8d10a7112",
  cluster: "eu",
  useTLS: true
});
router.get('/', (req, res) => {
  Vote.find().then(votes=>res.json({succes:true,votes:votes}))
  });
  router.post('/', (req, res) => {
    const newVote = {
      os:req.body.os,
      points:1
    }
    new Vote(newVote).save().then(vote=>{
      pusher.trigger("os-poll", "os-vote", {
        points:parseInt(vote.points),
        os:vote.os
      });
      return res.json({succes:true,message:'Thank you for voting'})
    });
   
   
  
    });

  module.exports = router