const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt


module.exports = app => {
    // parametros para estrategia de autenticação
    const params = {
        secretOrKey: authSecret,
        // dados colidos do header que vem do front end
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    // params criados axima, dele é estraido o payload
    const strategy = new Strategy(params, (payload, done) => {
        //consulta id do payload, se existir retorna ok
        app.db.raw(`SELECT * FROM users WHERE id = ${payload.id}`)
            .then(user =>
                done(null, user ? { ...payload } : 'error'))
            .catch(err => done(err, false))
    })
    passport.use(strategy)
    return {
        // autenticação das rotas
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}