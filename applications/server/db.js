const mongoose = require('mongoose');
const morgan = require('morgan');

module.exports = () =>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };

    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to MongoDB successfully")
    }catch(error){
        console.log(error);
        console.log("could not connect to database");
    }
};

// //db
// const db = mongoose.connect(
//     `mongodb://admin:csc890team4@52.53.210.26:27017/csc890Team4`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     //   useFindAndModify: false,
//     },
//     (err) => {
//       if (err) return console.error(err);
//       console.log("connected to mongoDB");
//     }
//   );