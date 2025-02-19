import jwt from "jsonwebtoken";
import usersController from "../auth/controller-users.js";
import toFile from "../tools/to.js"

const to = toFile.to;

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Comprobamos credenciales
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password));
    // Si no son validas, error
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    // Si son validas, generamos un JWT y lo devolvemos
    let user = await usersController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({userId: user.userId}, 'secretPassword');
    res.status(200).json(
        {token: token}
    )
}

export default { loginUser };