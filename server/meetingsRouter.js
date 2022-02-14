const express = require('express');
const meetingsRouter = express.Router();

const { getAllFromDatabase, deleteAllFromDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(getAllFromDatabase('meetings'))
});

meetingsRouter.delete('/', (req, res, next) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');
    console.log(deletedMeetings, getAllFromDatabase('meetings'))
    res.status(204).send(deletedMeetings);
});

module.exports = meetingsRouter;