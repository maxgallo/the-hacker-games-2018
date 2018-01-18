const connectDb = (opts) => {
  const {
    logger,
    mongoose
  } = opts;
  mongoose.connect(opts.mongoUrl, {}, error => {
    if (!error) {
      logger.info('connected to MongoDB');
    } else {
      logger.error('connection to MongoDB failed');
    }
  });
};

module.exports = {
  connectDb
}