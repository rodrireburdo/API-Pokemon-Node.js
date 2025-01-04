import bcrypt from 'bcrypt';

// Función para encriptar una contraseña
const hashPassword = (plainTextPwd, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
};

// Función para comparar una contraseña en texto plano con un hash
const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
};

export default crypto;