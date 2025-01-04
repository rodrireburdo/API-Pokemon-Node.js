import { v4 as uuidv4 } from 'uuid'; // Importación correcta de `uuid`
import crypto from '../crypto.js'; // Importa tu módulo `crypto`

const userDatabase = {};

// Función para registrar un nuevo usuario
const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);

    userDatabase[uuidv4()] = {
        userName: userName,
        password: hashedPwd
    }
};

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName === userName) {
            return userDatabase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('chacking user credentials');

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
    checkUserCredentials
};