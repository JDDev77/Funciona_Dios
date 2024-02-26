const cookieParser = require("cookie-parser")

const cookieParserMiddleware = cookieParser("passwordforcookies")

module.exports = cookieParserMiddleware
