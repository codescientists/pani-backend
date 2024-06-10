import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import orderRouter from "./routes/order.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello Welcome to Happy Water API!" });
});

app.use("/api/orders", orderRouter);


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8000, () =>
            console.log("Server started on port http://localhost:8000"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();