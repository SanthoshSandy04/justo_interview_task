// Logger Middleware
const logger = (req, res, next) => {
  const start = Date.now(); // Capture request start time
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate response time
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} - ${
        res.statusCode
      } (${duration}ms)`
    );
  });

  next(); // Move to the next middleware
};

module.exports = logger;
