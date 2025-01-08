import axios from "axios";
import teamsController from "./controller-teams.js";
import usersController from "../auth/controller-users.js";

const getUser = usersController.getUser;

const getTeamFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
    });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = (req, res) => {
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
}

const deletePokemonFromTeam = (req, res) => {
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
}

export default {
    getTeamFromUser,
    setTeamToUser,
    addPokemonToTeam,
    deletePokemonFromTeam
}


