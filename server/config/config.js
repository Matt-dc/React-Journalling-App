exports.PORT = process.env.PORT || 5000

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' ?
    process.env.CLIENT_ORIGIN :
    'http://localhost:3000'

exports.DB_URL = process.env.NODE_ENV === 'production' ? 
    process.env.DB_URL : 
    'mongodb://localhost/journalapp'

exports.TOKEN = process.env.JWT_KEY