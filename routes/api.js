var express = require('express');
var router = express.Router();

var passport = require('passport');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario');


router.post('/signup',
    async (req, res, next) => {
        let newUser = req.body;

        console.log('SIGNUP', newUser);

        user = await Usuario.findOne({ username: newUser.username });

        if (!user) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            newUser = await new Usuario(newUser).save();
            return res.json(newUser);
        } else
            // el usuario existe
            return res.status(401).json({ message: 'El usuario ya está registrado' });
    }
);

router.post('/signin', async (req, res, next) => {

    // llamo a authenticate. le meto la estrategia login (autenticame con login)
    // le paso una funcion de callback
    passport.authenticate('login', async (err, user, info) => {
        try {

            // si hubo un error o no hay ningun usuario autenticado
            if (err || !user) {
                if (info)
                    //devuelvo el motivo
                    return res.status(401).json(info);
                else
                    //sino error desconocido
                    return res.status(401).json({ message: 'Error desconocido' });
            } else
                req.login(user, { session: false },

                    async (error) => {
                        //si hubo un error
                        if (error) return next(error);
                        // si está todo bien... me traigo el usuario
                        const body = { _id: user._id, username: user.username };
                        //genero el web token
                        const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '60s' });
                        //guardarlo en las cookies
                        res.cookie('jwt', token);
                        //revolverlo al usuario
                        return res.json({ token });
                    }

                );

        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
});


//¿por qué da 401?
router.get('/user',
    // handler intermedio. autenticarme con jwt sin usar sesiones
    passport.authenticate('jwt', { session: false }),

    //Si el token es valido, ejecuta esto
    function (req, res, next) {
        res.json({
            message: 'Acceso concedido!',
            user: req.user,
            token: req.cookies['jwt']
        });
    });

//¿por qué da 401?
router.get('/publico',
    // handler intermedio. autenticarme con jwt sin usar sesiones
    //passport.authenticate('jwt', { session: false }),

    //Si el token es valido, ejecuta esto
    function (req, res, next) {
        res.send('Publico');
    });

router.post('/logout',
    async (req, res, next) => {
        req.logout();
        res.clearCookie('jwt');
        res.send('Logout');
    }
);


module.exports = router;
