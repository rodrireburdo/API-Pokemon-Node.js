import express from "express";
import passport from "passport";
import auth from "../auth.js";
import teamsController from "../controllers/teams.js";
import usersController from "../controllers/users.js";

const router = express.Router();
const getUser = usersController.getUser;

auth(passport);

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            let user = getUser(req.user.userId);
            res.status(200).json({
                trainer: user.userName,
                team: teamsController.getTeamOfUser(req.user.userId)
            });
        })
    .put(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
        teamsController.setTeam(req.user.userId, req.body.team);
        res.status(200).send();
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