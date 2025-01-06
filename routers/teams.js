import express from "express";
import passport from "passport";
import auth from "../auth.js";
const router = express.Router();

auth(passport);

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            res.status(200).send("Hello world!");
        }
    )
    .put((req, res) => {
        res.status(200).send("Hello world!");
    });

router.route('/pokemons')
    .post((req, res) => {
        res.status(200).send("Hello world!");
    });

router.route('/pokemons/:pokeid')
    .delete((req, res) => {
        res.status(200).send("Hello world!");
    });
    
export default router;