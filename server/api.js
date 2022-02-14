const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');
const { createNewModel, getModelById, updateModelById, deleteModelById } = require('./middleware');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const modelsById = ['/minions/:minionId', '/ideas/:ideaId'];

apiRouter.post('/ideas', checkMillionDollarIdea)
apiRouter.post(['/minions', '/ideas', '/meetings'], createNewModel);
apiRouter.get(modelsById, getModelById);
apiRouter.put(modelsById, updateModelById);
apiRouter.delete(modelsById, deleteModelById);

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
