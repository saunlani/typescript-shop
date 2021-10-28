export const validateSchema = (schema: any) => async (req, res, next) => {

    const body = req.body;

    try {
        await schema.validate(body);
        return next();
    }
    catch (error) {
        console.error(error)
        return res.status(400).json({ error })
    }
}