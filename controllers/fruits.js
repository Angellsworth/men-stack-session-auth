// controllers/fruits.js
const express = require('express');
const router = express.Router();

const Fruit = require('../models/fruit.js');
//renders for the very first time
router.get('/new', (req, res) => {
  res.render('fruits/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.name.trim()) {
      throw new Error("Invalid input: The name field cannot be blank!");
    }
    await Fruit.create(req.body);
    req.session.message = 'Fruit Created Succesfully'
    res.redirect('/fruits');  // Redirects to the list of fruits if successful
  } catch (error) {
    // res.render("fruits/new.ejs", { errorMessage: error.message });
    // res.render('error.ejs', { msg: error.message })
    req.session.message = error.message;
    res.redirect('/fruits')
  }
});

router.get('/', async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render('fruits/index.ejs', { fruits: foundFruits });
});

module.exports = router;
