import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import crypto from '../tools/crypto.js';
import teams from '../teams/controller-teams.js';
import toFile from "../tools/to.js"

const to = toFile.to;


const UserModel = mongoose.model('UserModel', 
    { userName: String, password: String, userId: String });

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await UserModel.deleteMany({}).exec();
        resolve();
    })
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuidv4();
        let newUser = new UserModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        });
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
        return new Promise(async (resolve, reject) => {
            let [err, result] = await to(UserModel.findOne({userName: userName}).exec());
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let [err, user] = await to(getUserIdFromUserName(userName));
        if (!err || user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject(err);
        }
    });
}

export default {
    cleanUpUsers,
    registerUser,
    getUser,
    checkUserCredentials,
    getUserIdFromUserName,
};