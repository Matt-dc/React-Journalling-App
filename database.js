const mongoose = require('mongoose')
// mongoose.Promise = global.Promise

const url = 'mongodb://localhost/testdb'

mongoose.connect(url).then(
    () => console.log("connected to mongo"),
    err => console.log("error connecting to mongo")
)


module.exports = mongoose.connection