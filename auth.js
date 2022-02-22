var passport = require('passport');

const JWTstrategy = require('passport-jwt').Strategy;

//lo voy a usar para chequear contra la base de datos
const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const Usuario = require('./model/usuario');

// Login
passport.use('login',
    new localStrategy(

        //me viene un username y un password
        async (username, password, done) => {
            try {
                const user = await Usuario.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'El usuario no existe' });
                }
                const validate = await bcrypt.compare(password, user.password)
                if (!validate) {
                    return done(null, false, { message: 'Error de password' });
                }
                return done(null, user, { message: `${user.username} logueado` });
            } catch (error) {
                return done(error);
            }
        }));


var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};


//cada vez que acceso a un recurso
//descencriptar el token de un recurso protegudo
passport.use(new JWTstrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: cookieExtractor
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }));
