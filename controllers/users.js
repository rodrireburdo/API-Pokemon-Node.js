import { v4 as uuidv4 } from 'uuid';
import crypto from '../crypto.js'; 
import teams from './teams.js'; 

const userDatabase = {};

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    let userId = uuidv4();
    userDatabase[userId] = {
        userName: userName,
        password: hashedPwd
    }
    teams.bootstrapTeam(userId);
};

const getUser = (userId) => {
    return userDatabase[userId];
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName === userName) {
            let userData = userDatabase[user];
            userData.userId = user;
            return userData;
        }
    }
}
const checkUserCredentials = (userName, password, done) => {
    console.log('Checking user credentials');

    let user = getUserIdFromUserName(userName);

    if (user) {
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    } else {
        done('missing user');
    }
};

export default {
    registerUser,
    getUser,
    checkUserCredentials,
    getUserIdFromUserName,
};