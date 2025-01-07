const teamsDatabase = {};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [{name: 'Charizard'}, {name: 'Blastoise'}];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId]
}
const addPokemon = (pokemonName, userId) => {
    teamsDatabase[userId].push({name: pokemonName});
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

export default {
    bootstrapTeam, 
    addPokemon, 
    setTeam,
    getTeamOfUser
};