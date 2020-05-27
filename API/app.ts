import express from "express";
import cors from "cors";
import router from "./routes/router";
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(router)
app.get("/", (req, res) => res.send(`Hello World`));

app.listen(port, () => console.log(`Listening on port ${port}`));
