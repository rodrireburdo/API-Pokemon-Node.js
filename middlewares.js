import bodyParser from "body-parser";

import authmiddleware from "./tools/auth-middleware.js"

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authmiddleware.init();
    app.use(authmiddleware.protecWithJwt)
}

export default { setupMiddlewares };