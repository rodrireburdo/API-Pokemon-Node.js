import express from "express";
import authRoutes from "./routers/auth.js"; // Importamos el router de autenticación.
import teamsRoutes from "./routers/teams.js"; // Importamos el router de equipos.

const app = express();
const port = 3000;

app.use("/auth", authRoutes);
app.use("/teams", teamsRoutes);
// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());


app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
})


export { app };