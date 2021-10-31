"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body);
        return next();
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map