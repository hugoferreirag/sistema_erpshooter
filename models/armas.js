const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations



    // salvar Produto
    const save = async (arma, res) => {
        const numerationExists = await app.db('weapons_inventory')
            .where({ numeration: arma.numeration })
            .first()
            .then()
            .catch(err => res.status(500).json(err))


        if (numerationExists) res.status(202).json('Numeração já Existente')

        const id_seq = await app.db('weapons_inventory_id_seq')
            .first()
            .then()
            .catch(err => res.status(500).json(err))


        let idAt = parseInt(id_seq.last_value)
        arma.bar_code = 'WPN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
        const bar_codeExists = await app.db('weapons_inventory')
            .where({ bar_code: arma.bar_code })
            .first()
            .then()
            .catch(err => res.status(500).json(err))


        if (bar_codeExists) {

            await app.db('weapons_nf')
                .insert({ nf: arma.nf, date: new Date(), caliber: arma.caliber })
                .then()
                .catch(err => res.status(500).json(err))

            await app.db('weapons_inventory')
                .insert(arma)
                .then(result => {
                    res.status(200).json('Arma inserida com sucesso')
                }).catch(err => {
                    res.status(500).json(err)
                    console.log(err)
                })

        } else {

            idAt = idAt + 1
            arma.bar_code = 'WPN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')

            await app.db('weapons_nf')
                .insert({ nf: arma.nf, date: new Date(), caliber: arma.caliber })
                .then()

            await app.db('weapons_inventory')
                .insert(arma)
                .then(_ => {

                    res.status(200).json('Arma inserida com sucesso')
                }).catch(err => {
                    res.status(500).json(err)
                    console.log(err)
                })
        }

    }


    // busca todos weapons_inventory
    const get = async (req, res) => {
        await app.db('weapons_inventory')
            .whereNull('deletedAt')
            .then(arma => res.status(201).json(arma))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = async (id, res) => {
        await app.db('weapons_inventory')
            .where({ id: id })
            .whereNull('deletedAt')
            .then(arma => res.status(200).json(arma))
            .catch(err => res.status(500).send(err))
    }
    // delete arma
    const remove = async (id, res) => {
        const idExists = await app.db('weapons_inventory')
            .where({ id: id })
            .first()
            .then()
            .catch(err => res.status(500).json(err))

        if (idExists) {
            app.db('weapons_inventory')
                .where({ id: id })
                .del()
                .then(_ => {
                    app.db('weapons_nf')
                        .where({ nf: result.nf })
                        .del()
                        .then(_ => res.status(201).json('Deletado com sucesso!'))
                        .catch(err => res.status(202).json(err))
                })



        }
    }

    // foto Produto
    const fileUpload = async (arma, res) => {
        await app.db('weapons_inventory')
            .where({ id: id })
            .update({ img: `${arma.img}` })
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, save, getById, remove, fileUpload }
}