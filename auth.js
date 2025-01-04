// Importamos las clases necesarias de la librería passport-jwt
// JwtStrategy: la estrategia que se utilizará para autenticar los tokens JWT.
// ExtractJwt: una herramienta para extraer el JWT del encabezado de la solicitud.
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// La función `configurePassport` se exporta como la configuración de la estrategia JWT para Passport.
// Esta función recibe un objeto `passport` como argumento.
export default function configurePassport(passport) {
    const opts = {
        // `jwtFromRequest`: Aquí definimos cómo se extraerá el token JWT de la solicitud.
        // `ExtractJwt.fromAuthHeaderWithScheme("JWT")` busca un token JWT en el encabezado de autorización.
        // El esquema "JWT" es lo que precede al token (ejemplo: "JWT token-value").
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        
        // `secretOrKey`: Aquí colocamos la clave secreta que usaremos para verificar la firma del token.
        // Esta clave debe ser la misma que la que se usa para firmar los tokens JWT cuando se emiten.
        secretOrKey: "secretPassword" // Usamos una clave estática como ejemplo, en un entorno real debe ser una clave segura.
    };

    // Creamos una nueva estrategia de JWT usando las opciones definidas previamente.
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        // Esta función es llamada después de que Passport haya decodificado el token JWT y verificado su firma.

        // `decoded`: El payload del token, que es el objeto que fue firmado al generar el JWT.
        // En este caso, se asume que el payload contiene información del usuario (ej. id, nombre).
        console.log('decoded jwt ', decoded); // Mostramos el contenido del token para depurar.

        // Si la autenticación es exitosa, se pasa `null` como primer argumento (error) y el objeto `decoded` como segundo argumento (usuario).
        // Si hay un error, se pasa `false` o un error como primer argumento.
        // En este caso, estamos pasando `null` y `decoded`, lo que significa que autenticamos correctamente al usuario.
        return done(null, decoded); // Esto indica que la autenticación fue exitosa y que el usuario está autenticado.
    }));
}

