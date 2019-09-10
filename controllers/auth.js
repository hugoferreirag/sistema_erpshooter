const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const { authSecret } = require('../.env')
module.exports = app => {

    // login
    const signin = async (req, res) => {
    
        // verifica campos vazios
        if (!req.body.email || !req.body.pass) {
            return res.status(202).json('Informe usuário e senha!')
        }
        const user = await app.db('users')
            .where({email:req.body.email})
            .first()
        
        console.log(user)
        // verifica se existe
        if (!user) return res.status(202).json('Usuário não existe!')
        if (!user.status) return res.status(202).json('Usuário desabilitado!')
        if (user.deletedAt) return res.status(202).json('Usuário deletado!')
        // senhas conferem
        const isMatch = bcrypt.compareSync(req.body.pass, user.pass)
        if (!isMatch) return res.status(202).json('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000)
        // gera payload pro jwt
        const payload = {
            id: user.id,
            nome: user.name,
            cargo: user.cargo_id,
            status: user.status,
            email: user.email,
            master: user.admin,
            logged:true,
            iat: now,
            exp: now + (60 * 60 * 24)
        }
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }
        // valida time do token
    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.json(true)
                }
            }
        } catch (e) {
            res.status(400).json(e)  
        }
        res.json(false)
    }
    return { signin, validateToken }
}