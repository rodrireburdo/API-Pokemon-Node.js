import { v4 as uuidv4 } from 'uuid'; // Importación correcta de `uuid`
import crypto from '../crypto.js'; // Importa tu módulo `crypto`

const userDatabase = {};

// Función para registrar un nuevo usuario
const registerUser = (userName, password) => {
    crypto.hashPassword(password, (err, hashedPassword) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            return;
        }
        const userId = uuidv4(); // Genera un ID único para el usuario
        userDatabase[userId] = {
            userName: userName,
            password: hashedPassword,
        };
        console.log(`Usuario registrado con éxito: ${userId}`);
    });
};

// Función para verificar las credenciales del usuario
const checkUserCredentials = (userId, password, done) => {
    const user = userDatabase[userId];

    if (!user) {
        console.error('Usuario no encontrado.');
        return done(new Error('Usuario no encontrado'), false);
    }

    crypto.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
            console.error('Error al comparar las contraseñas:', err);
            return done(err, false);
        }

        if (isMatch) {
            console.log('Contraseña correcta.');
            return done(null, true);
        } else {
            console.log('Contraseña incorrecta.');
            return done(null, false);
        }
    });
};

export default {
    registerUser,
    checkUserCredentials
};