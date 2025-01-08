import jwt from "jsonwebtoken";
import usersController from "../auth/controller-users.js";

usersController.registerUser("rodri", "4321");
usersController.registerUser("bettatech", "1234");

const loginUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing datad' });
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'Missing data' });
    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        let user = usersController.getUserIdFromUserName(req.body.user);
        const token = jwt.sign({ userId: user.userId }, 'secretPassword');
        res.status(200).json({ token: token });
    })
}

export default { loginUser };