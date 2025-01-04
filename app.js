import express from "express";
import passport from "passport";
import auth from "./auth.js";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";


import usersController from "./controllers/users.js";
usersController.registerUser("rodri", "4321");
usersController.registerUser("bettatech", "1234");

const app = express();
const port = 3000;

auth(passport);
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing datad' });
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'Missing data' });

    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: result }, 'secretPassword');
        res.status(200).json({ token: token });
    })

    if (!username || !password) {
        return res.status(400).json({ message: 'El username y password son obligatorios.' });
    }

    usersController.checkUserCredentials(username, password, (err, result) => {
        // Si no son válidas devolvemos error (401)
        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Si son válidas, generamos un JWT y lo devolvemos (200)
        const token = jwt.sign({ userId: username }, 'clave_secreta', { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
})

app.post("/team/pokemons", () => {
    res.status(200).send("Hello world!");
})

app.get("/team",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    res.status(200).send("Hello world!");
})


app.delete("/team/pokemons:pokeid", () => {
    res.status(200).send("Hello world!");
})

app.put("/team", () => {
    res.status(200).send("Hello world!");
})


app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
})

export { app };