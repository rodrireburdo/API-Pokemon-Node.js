import express from "express";
import bodyParser from "body-parser";

// RUTAS
import authRoutes from "./auth/router-auth.js";
import teamsRoutes from "./teams/router-teams.js";

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