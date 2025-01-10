let teamsDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) => {
        for (let user in teamsDatabase) {
            teamsDatabase[user] = [];
        }
        resolve();
    })
}

const bootstrapTeam = (userId) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = [];
        resolve();
    });
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId])
    })
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId].length == 6) {
            reject('Team is full');
        } else {
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    });
}

const deletePokemonAt = (userId, index) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId][index]) {
            teamsDatabase[userId].splice(index, 1);
        }
        resolve();
    })
}

const setTeam = (userId, team) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = team;
        resolve();
    })
}

export default {
    cleanUpTeam,
    bootstrapTeam,
    addPokemon,
    deletePokemonAt,
    setTeam,
    getTeamOfUser
};