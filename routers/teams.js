import express from "express";
import passport from "passport";
import auth from "./auth.js";
import bodyParser from "body-parser";


const router = express.Router();

auth(passport);

router.route('/')
.get(
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    res.status(200).send("Hello world!");
    }
)
.put(
    res.status(200).send("Hello world!")
)

app.post("/team/pokemons", () => {
    res.status(200).send("Hello world!");
})

app.delete("/team/pokemons:pokeid", () => {
    res.status(200).send("Hello world!");
})