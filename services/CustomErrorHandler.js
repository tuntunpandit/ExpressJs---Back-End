class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static emailAlreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }
    static wrongCredentials(message = 'email or password is wrong!') {
        // 401 - Authorization error
        return new CustomErrorHandler(401, message);
    }
    static unAuthorized(message = 'unAuthorized!') {
        // 401 - Authorization error
        return new CustomErrorHandler(401, message);
    }
    static notFound(message = '404 Not Found!') {
        return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler;