const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI, (err) => {
        if (err) {
            console.log(err);
        }
        else
            console.log("Connected to Mongo successfully!");
    });
};

module.exports = connectToMongo;
