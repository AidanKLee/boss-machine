const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase } = require('./db');

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
})

module.exports = ideasRouter;