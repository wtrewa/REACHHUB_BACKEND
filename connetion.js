const { default: mongoose } = require("mongoose")

const connection = async()=>{
   await mongoose.connect('mongodb+srv://psaurabh574:psaurabh574@reachhub.thogbod.mongodb.net/reachhubdatabase?retryWrites=true&w=majority')
   console.log('connection has built')

}

module.exports = connection;