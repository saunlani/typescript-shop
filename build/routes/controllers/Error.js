"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (e) {
        next(e);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=Error.js.map