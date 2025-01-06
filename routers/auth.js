import express from "express";
import jwt from "jsonwebtoken";
import usersController from "../controllers/users.js"; // Corrige la ruta según tu estructura.
const router = express.Router();

usersController.registerUser("rodri", "4321");
usersController.registerUser("bettatech", "1234");

router.route('/')
    .get((req, res) => {
        res.send('POST Auth router')
    })
    .post((req, res) => {
        res.send('POST Auth router')
    })

router.route('/login')
    .post((req, res) => {
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

            const token = jwt.sign({ userId: result }, 'secretPassword');
            res.status(200).json({ token: token });
        })
    })

export default router;