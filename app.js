import express from "express";
import middlewares from "./middlewares.js"
import './database.js'
// RUTAS
import authRoutes from "./auth/router-auth.js";
import teamsRoutes from "./teams/router-teams.js";

const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
});

app.use("/auth", authRoutes);
app.use("/teams", teamsRoutes);

app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
});

export { app };