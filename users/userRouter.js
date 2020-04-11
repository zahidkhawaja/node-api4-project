const express = require('express');
const router = express.Router();
const User = require("./userDb");
const Post = require("../posts/postDb");
var cors = require("cors");

// GET all users
router.get('/', cors(), (req, res) => {
  User.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error getting users."})
  })
});

// GET user by ID
router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Cannot retrieve user."})
  })
});

// POST user
router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
  .then(users => {
    res.status(201).json(users)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Cannot add user."})
  })
});

// PUT user
router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body)
  .then(user => {
    user ? res.status(200).json(user) : res.status(404).json({ message: "User not found."})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Unable to update the user."})
  })
});

// DELETE user
router.delete('/:id', (req, res) => {
  User.remove(req.params.id)
  .then(count => {
    count > 0 ? res.status(200).json({ message: "User has been deleted."}) : res.status(404).json({ message: "Cannot find user."})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error removing user."})
  })
});

// GET posts by user ID
router.get('/:id/posts', (req, res) => {
  Post.getById(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error getting posts for this user ID."})
  })
});

// POST posts by user ID
router.post('/:id/posts', validatePost, (req, res) => {
  Post.insert(req.body)
  .then(userPost => {
    res.status(201).json(userPost);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error adding post."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  User.getById(req.params.id)
  .then(user => {
    user ? req.user = user : res.status(400).json({ message: "Incorrect user ID."})
  })
  next();
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "User data missing."})
  }  else if(req.body.name === "") {
    res.status(400).json({ message: "Missing name."})
  } else {
    next();
}
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Post data missing."})
  }  else if(req.body.name === "") {
    res.status(400).json({ message: "Missing post text."})
  } else {
    next();
}
}

module.exports = router;
