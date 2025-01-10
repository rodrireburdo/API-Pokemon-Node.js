import axios from "axios";
import teamsController from "./controller-teams.js";
import usersController from "../auth/controller-users.js";

const getUser = usersController.getUser;

const getTeamFromUser = async (req, res) => {
    let user = getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId)
    res.status(200).json({
        trainer: user.userName,
        team: team
    });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}


const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let pokeApiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase())
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id
    }
    try {
        await teamsController.addPokemon(req.user.userId, pokemon);
        return res.status(201).json(pokemon);

    } catch (error) {
        return res.status(400).json({ message: "you have already 6 pokemon" });
    }
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


