const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, addToDatabase } = require('./db');
const { updateModelById, deleteModelById } = require('./middleware');

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId;
    if (isNaN(minionId)) {
        return res.status(404).send()
    }
    const allWork = getAllFromDatabase('work');
    const minionWork = allWork.filter(job => job.minionId === minionId)
    if (minionWork.length > 0) {
        return res.status(200).send(minionWork);
    }
    res.status(404).send(`Cannot retrieve work for minion ${id}.`)
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body)
    if (newWork) {
        return res.status(201).send(newWork);
    }
    res.status(404).send('Invalid work, could not add to the database.')
});

minionsRouter.put('/:minionId/work/:workId', updateModelById);

minionsRouter.delete('/:minionId/work/:workId', deleteModelById);

module.exports = minionsRouter;