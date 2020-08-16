const { createLogger, format, transports} = require('winston');

const log_format = format.combine(
    format.timestamp(),
    format.printf(
        info => {
            return `[${info.level}][${info.timestamp}]${info.message}`;
        })
);

const logger = createLogger({
    format: log_format,
    transports: new transports.Console()
});

module.exports = logger;