const crypto = require('crypto');

// Generate a random JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(jwtSecret);
