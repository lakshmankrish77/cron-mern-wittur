import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const CONNECTION_STRING = "mongodb+srv://lakshmankrish:rlkIAAeWgrvvQxUl@cluster0.ucf13f1.mongodb.net/wittur-materials-db?retryWrites=true&w=majority"
    const connect = await mongoose.connect(CONNECTION_STRING);
    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectDB;
