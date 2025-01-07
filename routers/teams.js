import express from "express";
import passport from "passport";
import auth from "../auth.js";
import axios from "axios";
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
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            console.log("llamada a pokeapi");
            let pokemonName = req.body.name;
            axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase())
                .then(function (response) {
                    let pokemon = {
                        name: pokemonName,
                        pokedexNumber: response.data.id
                    }
                    teamsController.addPokemon(req.user.userId, pokemon);

                    res.status(201).json(pokemon);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(400).json({ message: error });
                })
                .then(function () {

                });
        });

router.route('/pokemons/:pokeid')
    .delete(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
        res.status(200).send();
    });

export default router;