export module Controller {
    // passes errors to express error middleware
export const errorHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}