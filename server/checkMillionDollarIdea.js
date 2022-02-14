const checkMillionDollarIdea = (req, res, next) => {
    const totalRevenue = req.body.numWeeks * req.body.weeklyRevenue;
    if (!req.body.numWeeks || !req.body.weeklyRevenue || isNaN(req.body.numWeeks) || isNaN(req.body.weeklyRevenue) || totalRevenue < 1000000) {
        return res.status(400).send()
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
