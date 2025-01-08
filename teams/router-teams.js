import express from "express";
import teamsHttpHandler from "./teams-http.js";

const router = express.Router();

router.route('/')
    .get(teamsHttpHandler.getTeamFromUser)
    .put(teamsHttpHandler.setTeamToUser);

router.route('/pokemons')
    .post(teamsHttpHandler.addPokemonToTeam);

router.route('/pokemons/:pokeid')
    .delete(teamsHttpHandler.deletePokemonFromTeam);

export default router;