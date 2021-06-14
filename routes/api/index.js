const express = require('express');
const Router = require('express-promise-router');

const router = new Router();

// index GET: What is this?
router.get('/', function(req, res, next) {
    res.json({ msg: 'This is version 1.0 of the LiturgiCalendar API' });
});

module.exports = router;
