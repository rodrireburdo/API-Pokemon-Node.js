import { v4 as uuidv4 } from 'uuid';
import crypto from '../tools/crypto.js';
import teams from '../teams/controller-teams.js';

let userDatabase = {};

const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        userDatabase = {};
        resolve();
    })
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuidv4();
        userDatabase[userId] = {
            userName: userName,
            password: hashedPwd
        }
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(userDatabase[userId]);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise((resolve, reject) => {
        for (let user in userDatabase) {
            if (userDatabase[user].userName === userName) {
                let userData = userDatabase[user];
                userData.userId = user;
                return resolve(userData);
            }
        }
        reject('No user found');
    });
}
const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserIdFromUserName(userName);
        if (user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('missing user');
        }
    })
}

export default {
    cleanUpUsers,
    registerUser,
    getUser,
    checkUserCredentials,
    getUserIdFromUserName,
};