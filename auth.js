import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default function configurePassport(passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: "secretPassword"
    };

    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt ', decoded);  
        done(null, decoded);
    }));
}