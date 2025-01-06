import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routers/auth.js";
import teamsRoutes from "./routers/teams.js";

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
});

app.use("/auth", authRoutes);
app.use("/teams", teamsRoutes);

app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
});

export { app };