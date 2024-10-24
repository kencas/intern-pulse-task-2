import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URI } from "./db.config";

// mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    console.log(MONGO_URI)
    await mongoose.connect(
      MONGO_URI as string,
      {
        //mongodb://localhost:27017/wordle_db
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Database is connected");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
