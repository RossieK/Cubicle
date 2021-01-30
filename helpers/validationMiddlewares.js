function validateProduct(req, res, next) {
    let isValid = true;

    if (req.body.name.trim().length < 2) {
        isValid = false;
    } else if (!req.body.imageUrl) {
        isValid = false;
    } else if (!req.body.description) {
        isValid = false;
    } else if (req.body.difficultyLevel < 1 || req.body.difficultyLevel > 6) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}

function validateAccessory(req, res, next) {
    let isValid = true;

    if (req.body.name.trim().length < 2) {
        isValid = false;
    } else if (!req.body.imageUrl) {
        isValid = false;
    } else if (!req.body.description) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}

module.exports = {
    validateProduct,
    validateAccessory
};