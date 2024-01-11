const { connect } = require("mongoose");
const DB = "mongodb://localhost:27017/test_node_js";

const connectDB = () => {
    try {
        connect(DB);
        console.log("connecteed to DB");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
