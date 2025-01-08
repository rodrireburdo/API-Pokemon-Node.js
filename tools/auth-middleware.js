import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: "secretPassword"
    };
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const protecWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next();
    }
    return passport.authenticate('jwt', { session: false})(req, res ,next)
}

export default {
    init,
    protecWithJwt
}