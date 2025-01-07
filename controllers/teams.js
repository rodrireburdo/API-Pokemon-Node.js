const teamsDatabase = {};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId]
}
const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const deletePokemonAt = (userId, index) => {
    if (teamsDatabase[userId][index]) {
        teamsDatabase[userId].splice(index, 1);
    }
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

export default {
    bootstrapTeam, 
    addPokemon, 
    deletePokemonAt,
    setTeam,
    getTeamOfUser
};