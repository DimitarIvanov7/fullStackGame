import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import duelRouter from "./routes/duelRoutes.js";

const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log("listening on PORT: ", port));
app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
		allowedHeaders: ["Content-Type", "Authorization"],
	})

	// allowedHeaders(["Content-Type", "Authorization"])
);

app.use("/api/user", userRouter);

app.use("/api/duels", duelRouter);
