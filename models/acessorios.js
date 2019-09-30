const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations



    // salvar Produto
    const save = async (acessorio, res) => {

        const numerationExists = await app.db('acessory_inventory')
            .select('numeration')
            .where({ numeration: acessorio.numeration })
            .first()
            .then()
            .catch(err => res.status(500).json(err))
        if (numerationExists) res.status(202).json('Numeração já existente')

        const id_seq = app.db('acessory_inventory_id_seq')
            .first()
            .then()
            .catch(err => res.status(500).json(err))


        let idAt = parseInt(id_seq.last_value)
        acessorio.bar_code = 'ACS' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')

        const bar_codeExists = app.db('acessory_inventory')
            .where({ bar_code: acessorio.bar_code })
            .first()
            .then()
            .catch(err => res.status(500).json(err))

        if (bar_codeExists) {

            app.db('acessory_nf')
                .insert({ nf: acessorio.nf, date: new Date() })
                .then()
                .catch(err => res.status(500).json(err))

            app.db('acessory_inventory')
                .insert(acessorio)
                .then(_ => {
                    res.status(200).json('Acessório inserido com sucesso')
                }).catch(err => res.status(500).json(err))

        } else {

            idAt = idAt + 1
            acessorio.bar_code = 'ACS' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')

            app.db('acessory_nf')
                .insert({ nf: acessorio.nf, date: new Date() })
                .then()

            app.db('acessory_inventory')
                .insert(acessorio)
                .then(_ => {

                    res.status(200).json('Acessório inserido com sucesso')
                }).catch(err => res.status(500).json(err))
        }

    }

    // busca todos acessory_inventory
    const get = (req, res) => {
        app.db('acessory_inventory')
            .whereNull('deletedAt')
            .then(acessorio => res.status(200).json(acessorio))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = (id, res) => {
        app.db('acessory_inventory')
            .where({ id: id })
            .whereNull('deletedAt')
            .then(acessorio => res.status(200).json(acessorio))
            .catch(err => res.status(500).send(err))
    }
    // delete acessorio
    const remove = async (id, res) => {
        const idExits = await app.db('acessory_inventory')
            .where({ id: id })
            .first()
            .then()
            .catch(err => res.status(500).json(err))

        if (idExits) {
            await app.db('acessory_inventory')
                .where({ id: id })
                .del()
                .then()
                .catch(err => res.status(500).json(err))

            await app.db('acessory_nf')
                .where({ nf: idExits.nf })
                .del()
                .then(_ => res.status(201).json('Deletado com sucesso!'))
                .catch(err => res.status(202).json(err))




        }
    }

    // foto Produto
    const fileUpload = (acessorio, res) => {
        app.db('acessory_inventory')
            .where({ id: id })
            .update({ img: `${acessorio.img}` })
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, save, getById, remove, fileUpload }
}