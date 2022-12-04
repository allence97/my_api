const fs = require("fs");
exports.base64_encode = (file) => { return "data:image;base64," + fs.readFileSync(file, 'base64'); }
