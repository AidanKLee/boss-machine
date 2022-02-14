const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { addToDatabase, createMeeting, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, getAllFromDatabase } = require('./db');

// GET by ID
const getModelById = (req, res, next) => {
    let id;
    let model;
    if (req.params.minionId) {
        id = req.params.minionId;
        model = 'minions';
    } else if (req.params.ideaId) {
        id = req.params.ideaId;
        model = 'ideas'
    }

    const selected = getFromDatabaseById(model, id);
    if (selected) {
        res.status(200).send(selected);
    } else {
        res.status(404).send(`Does not exist in ${model}.`)
    }
}

// POST requests
const createNewModel = (req, res, next) => {
    let body = req.body;
    let model;
    if (req.url === '/minions') {
        body.salary = Number(body.salary);
        model = 'minions';
    } else if (req.url === '/ideas') {
        body.numWeeks = Number(body.numWeeks);
        body.weeklyRevenue = Number(body.weeklyRevenue);
        model = 'ideas';
    } else if (req.url === '/meetings') {
        const meeting = createMeeting()
        body = meeting
        model = 'meetings';
    }

    if (model) {
        const newPost = addToDatabase(model, body);
        return res.status(201).send(newPost);
    }
    res.status(400).send('Invalid POST request.')
}

// PUT requests
const updateModelById = (req, res, next) => {
    const body = req.body;
    let id;
    let model;
    if (req.params.minionId && !req.params.workId) {
        id = req.params.minionId;
        model = 'minions';
    } else if (req.params.ideaId) {
        id = req.params.ideaId;
        model = 'ideas'
    } else if (req.params.minionId && req.params.workId) {
        id = req.params.workId;
        model = 'work'
        const allWork = getAllFromDatabase('work');
        const workById = allWork.filter(job => job.id === id)[0];
        if (isNaN(req.params.workId) || allWork.filter(work => work.id === id).length < 1) {
            return res.status(404).send();
        }
        if (workById.minionId !== req.params.minionId) {
            return res.status(400).send();
        }
    }

    if (id === body.id) {
        const updatedModel = updateInstanceInDatabase(model, body)
        return res.status(200).send(updatedModel);
    }
    res.status(404).send(`Unable to update this model in ${model}`);
    
}

// DELETE requests
const deleteModelById = (req, res, next) => {
    let id;
    let model;
    if (req.params.minionId && !req.params.workId) {
        id = req.params.minionId;
        model = 'minions';
    } else if (req.params.ideaId) {
        id = req.params.ideaId;
        model = 'ideas';
    } else if (req.params.minionId && req.params.workId) {
        id = req.params.workId;
        model = 'work';
    }

    const deleted = deleteFromDatabasebyId(model, id);
    if (deleted) {
        return res.status(204).send({});
    }
    res.status(404).send(`Unable to delete this model in ${model}`)
}

module.exports = {
    getModelById,
    createNewModel,
    updateModelById,
    deleteModelById
}