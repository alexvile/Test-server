class CustomError extends Error { 
    constructor(message) { 
        super(message);
        this.status = 400;
    }
}

class RegistrationConflictError extends CustomError { 
    constructor(message) { 
    super(message);
    this.status = 409;
    }
}

module.exports = {
    CustomError, RegistrationConflictError
}