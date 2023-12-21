

// const LOG_LEVELS = {
//     ERROR: 0,
//     WARN: 1,
//     INFO: 2,
//     DEBUG: 3
//   };
  
// let currentLogLevel = LOG_LEVELS.INFO;

// const logger = {
// error: function(msg) {
//     if (currentLogLevel >= LOG_LEVELS.ERROR) {
//     console.error(msg);
//     }
// },
// warn: function(msg) {
//     if (currentLogLevel >= LOG_LEVELS.WARN) {
//     console.warn(msg);
//     }
// },
// info: function(msg) {
//     if (currentLogLevel >= LOG_LEVELS.INFO) {
//     console.info(msg);
//     }
// },
// debug: function(msg) {
//     if (currentLogLevel >= LOG_LEVELS.DEBUG) {
//     console.log(msg);
//     }
// }
// };

// Usage:
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.debug('This is a debug message');


export function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }

    return result;
}

// Usage: Generate a random string of length 10
// const randomString = generateRandomString(10);