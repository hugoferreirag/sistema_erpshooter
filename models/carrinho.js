const bcrypt = require('bcrypt-nodejs')
module.exports = app => {
    const encrypt = string => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt)
    }
    const getById = async (id, res) => {
        await app.db('carrinho_temp')
            .where({ id: id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.status(500).json(err))
    }
    const getMunicao = async (id, res) => {
        await app.db('tmp_municao')
            .where({ id_user: id })
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
    const getArma = async (id, res) => {
        await app.db('tmp_arma')
            .where({ id_user: id })
            .then(result => res.status(200).json(result))
            .cath(err => res.status(500).json(err))
    }
    const getAcessorio = async (id, res) => {
        await app.db('tmp_acessorio')
            .where({ id_user: id })
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
    const getClient = async (id, res) => {
        await app.db('tmp_client')
            .where({ id_user: id })
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }

    const getTotal = async (id, res) => {
        await app.db('tmp_total')
            .where({ id_user: id })
            .first()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }

    const insertClient = async (cliente, res) => {
        const dateBox = await app.db('status_caixa')
            .select('date')
            .first()
            .then()
            .catch(err => res.status(500).json(err))

        var dateCaixa = Date.parse(dateBox.date)
        var dateCaixaToString = new Date(dateCaixa).toLocaleDateString()
        var localeDate = new Date().toLocaleDateString()
        if (dateCaixaToString === localeDate) {

            cliente.cod_pedido = new Date().toLocaleString() + encrypt(cliente.nome)
            if (cliente) {
                const clienteTempExists = await app.db('tmp_client')
                    .where({ id_user: cliente.id_user })
                    .first()
                    .then()
                    .catch(err => res.status(500).json(err))

                if (clienteTempExists > 0) {
                    app.db('tmp_client')
                        .update(cliente)
                        .where({ id_user: cliente.id_user })
                        .then(_ => res.status(200).json('Cliente inserido'))
                        .catch(err => res.status(500).json(err))
                } else {
                    app.db('tmp_client')
                        .insert(cliente)
                        .then(_ => res.status(200).json('Cliente inserido'))
                        .catch(err => res.status(500).json(err))
                }
            }
        } else {
            return res.status(400).json('Por favor,fechar caixa do dia anterior e reabrir caixa')
        }
    }

    const insertArm = async (arma, res) => {
        const armVerify = await app.db('inventario_armas')
            .where({ cod_barras: arma.cod_arma, utilizacao: true })
            .first()
            .then()
            .catch(err => res.status(500).json(err))
        if (armVerify) return res.status(202).json('Arma está em uso')

        await app.db('tmp_armas')
            .insert(arma)
            .then()
            .catch(err => res.status(500).json(err))

        await app.db('inventario_armas')
            .where({ cod_barras: arma.cod_arma })
            .update({ utilizacao: true })
            .then(result => res.status(200).json('Arma inserida'))
            .catch(err => res.status(500).json(err))



    }

    const insertMunicao = async (municao, res) => {
        await app.db('tmp_municao')
            .insert(municao)
            .then()
            .catch(err => res.status(500).json(err))

        const verifyAmmunition = await app.db('tmp_total')
            .where({ id_user: municao.id_user })
            .first()
            .then()
            .catch(err => res.status(500).json(err))
        if (!verifyAmmunition) {
            await app.db('tmp_total')
                .insert({ id_user: municao.id_user, total: municao.sub_total, cod_pedido: municao.cod_pedido, cod_cliente: municao.cod_cliente })
                .then(result => res.status(200).json('Munição inserida'))
                .catch(err => res.status(500).json(err))
        } else {
            await app.db('tmp_total')
                .where({ id_user: municao.id_user })
                .increment({ total: municao.sub_total })
                .then(result => res.status(200).json('Munição inserida'))
                .catch(err => res.status(500).json(err))
        }

    }
    const insertAcessorio = async (acessorio, res) => {
        const verifyAcs = await app.db('inventario_acessorios')
            .where({ cod_barras: acessorio.cod_acessorio, utilizacao: true })
            .then()
            .catch(err => res.status(500).json(err))

        if (verifyAcs) return res.status(400).json('Acessorio está em uso')
        await app.db('tmp_acessorios')
            .insert(acessorio)
            .then()
            .catch(err => res.status(err).json(err))

        await app.db('inventario_acessorios')
            .where({ cod_barras: acessorio.cod_acessorio })
            .update({ utilizacao: true })
            .then(result => res.status(200).json('Acessorio inserida'))
            .catch(err => res.status(500).json(err))


    }
    const deleteMunicao = async (municao, res) => {
        await app.db('estoque')
            .where({ calibre: municao.calibre, fornecedor: municao.fornecedor })
            .increment({ quantidade: municao.quantidade })
            .then()
            .catch(err => res.status(500).json(err))

        await app.db('tmp_total')
            .where({ id_user: municao.id_user })
            .decrement({ total: municao.sub_total })
            .then()
            .catch(err => res.status(500).json(err))

        await app.db('tmp_municao')
            .where({ id: municao.id })
            .del()
            .then(_ => res.status(200).json('Munição deletada'))
            .catch(err => res.status(500).json(err))



    }

    const deleteArma = async (arma, res) => {
        await app.db('tmp_armas')
            .where({ id: arma.id })
            .del()
            .then()
            .catch(err => res.status(500).json(err))

        await app.db('inventario_armas')
            .where({ cod_barras: arma.cod_barras })
            .update({ utilizacao: 0 })
            .then(_ => res.status(200).json('Arma deletada'))
            .catch(err => res.status(500).json(err))

    }
    const deleteAcessorio = async (acessorio, res) => {
        await app.db('tmp_acessorio')
            .where({ id: acessorio.id })
            .del()
            .then()
            .catch(err => res.status(500).json(err))
        await app.db('inventario_acessorios')
            .where({ cod_barras: acessorio.cod_barras })
            .update({ utilizacao: 0 })
            .then(_ => res.status(200).json('Acessorio deletada'))
            .catch(err => res.status(500).json(err))


    }

    const checkStock = async (municao, res) => {
        if (municao.municao_clube == true) {
            await app.db('estoque')
                .where({ calibre: municao.calibre, fornecedor: municao.fornecedor })
                .select('quantidade')
                .first()
                .then(result => {
                    if (result.quantidade >= 500 && result.quantidade > municao.quantidade) {
                        app.db('estoque')
                            .where({ calibre: municao.calibre, fornecedor: municao.fornecedor })
                            .decrement({ quantidade: municao.quantidade })
                            .then(result => res.status(200).json('Inserido no carrinho com sucesso'))
                            .catch(err => res.status(500).json(err))
                    } else if (result.quantidade <= 200 && result.quantidade > municao.quantidade) {
                        app.db('estoque')
                            .where({ calibre: municao.calibre, fornecedor: municao.fornecedor })
                            .decrement({ quantidade: municao.quantidade })
                            .then(result => res.status(200).json('Inserido, quantidade menor que 200.. abastecer'))
                            .catch(err => res.status(500).json(err))
                    } else if (result.quantidade == 0 || result.quantidade <= 0 || result.quantidade && result.quantidade < municao.quantidade) {
                        res.status(400).json('Estoque insuficiente')
                    } else {
                        app.db('estoque')
                            .where({ calibre: municao.calibre, fornecedor: municao.fornecedor })
                            .decrement({ quantidade: municao.quantidade })
                            .then(result => res.status(200).json('Inserido no carrinho com sucesso'))
                            .catch(err => res.status(500).json(err))
                    }
                })
                .catch(err => res.status(500).json(err))
        } else {
            return res.status(200).json('Inserido no carrinho com sucesso')
        }
    }
    const cancelPedido = async (id, res) => {

        await app.db('tmp_client')
            .where({ id_user: id })
            .fisrt()
            .then(result => {

                if (result) {
                    app.db('tmp_municao')
                        .where({ id_user: id })
                        .first()
                        .then(result => {

                            if (result) {
                                app.db('estoque')
                                    .where({ calibre: result.calibre, fornecedor: result.fornecedor })
                                    .increment({ quantidade: result.quantidade })
                                    .then(result => {

                                        app.db('tmp_armas')
                                            .where({ id_user: id })
                                            .select('numeracao')
                                            .first()
                                            .then(result => {

                                                if (result) {
                                                    app.db('inventario_armas')
                                                        .where({ numeracao: result.numeracao })
                                                        .update({ utilizacao: false })
                                                        .then(result => {

                                                            app.db('tmp_acessorio')
                                                                .where({ id_user: id })
                                                                .first()
                                                                .then(result => {

                                                                    if (result) {
                                                                        app.db('inventario_acessorios')
                                                                            .where({ numeracao: result.numeracao })
                                                                            .update({ utilizacao: false })
                                                                            .then(result => {

                                                                                app.db('tmp_municao')
                                                                                    .where({ id_user: id })
                                                                                    .del()
                                                                                    .then(result => {

                                                                                        app.db('tmp_armas')
                                                                                            .where({ id_user: id })
                                                                                            .del()
                                                                                            .then(result => {

                                                                                                app.db('tmp_acessorios')
                                                                                                    .where({ id_user: id })
                                                                                                    .del()
                                                                                                    .then(result => {

                                                                                                        app.db('tmp_client')
                                                                                                            .where({ id_user: id })
                                                                                                            .del()
                                                                                                            .then(result => {

                                                                                                                app.db('tmp_total')
                                                                                                                    .where({ id_user: id })
                                                                                                                    .del()
                                                                                                                then(result => {
                                                                                                                    res.status(200).json('Pedido cancelado')
                                                                                                                }).catch(err => res.status(500).json(err))
                                                                                                            }).catch(err => res.status(500).json(err))
                                                                                                    }).catch(err => res.status(500).json(err))
                                                                                            }).catch(err => res.status(500).json(err))
                                                                                    }).catch(err => res.status(500).json(err))
                                                                            }).catch(err => res.status(500).json(err))
                                                                    } else {

                                                                    }
                                                                }).catch(err => res.status(500).json(err))
                                                        })
                                                } else {

                                                }

                                            }).catch(err => res.status(500).json(err))
                                    }).catch(err => res.status(500).json(err))
                            } else {

                            }
                        }).catch(err => res.status(500).json(err))
                } else {

                }
            }).catch(err => res.status(500).json(err))
    }

    const cancelPedido2 = async (id, res) => {
        app.db('tmp_municao')
            .where({ id_user: id })
            .del()
            .then(result => {

                app.db('tmp_armas')
                    .where({ id_user: id })
                    .del()
                    .then(result => {

                        app.db('tmp_acessorios')
                            .where({ id_user: id })
                            .del()
                            .then(result => {

                                app.db('tmp_client')
                                    .where({ id_user: id })
                                    .del()
                                    .then(result => {

                                        app.db('tmp_total')
                                            .where({ id_user: id })
                                            .del()
                                            .then(result => res.status(200).json('Pedido cancelado')

                                            ).catch(err => res.status(500).json(err))
                                    }).catch(err => res.status(500).json(err))
                            }).catch(err => res.status(500).json(err))
                    }).catch(err => res.status(500).json(err))
            }).catch(err => res.status(500).json(err))
    }

    const concluir = async (data, res) => {
        if (!data.stand) {
            await app.db('stands')
                .where({ id: data.stand })
                .first()
                .then(result => {

                    if (result.status == false) {
                        app.db('stands')
                            .where({ id: data.stand })
                            .update({
                                status: true, atividade: data.atividade, id_client: data.id_client,
                                name_client: data.name_client, entrada: new Date(), cod_pedido: data.cod_pedido
                            })
                            .then(result => {

                                app.db.raw('UPDATE estoque SET old_qtd = quantidade')
                                    .then(result => {

                                        app.db('pedido')
                                            .insert(data)
                                            .then(result => {

                                                app.db('pedido')
                                                    .where({ cod_cliente: data.cod_cliente, date: new Date().toLocaleDateString() })
                                                    .then(result => {

                                                        if (result.length == 1) {
                                                            app.db('clientes')
                                                                .where({ cod_barras: data.cod_cliente })
                                                                .increment({ presenca: 1 })
                                                                .then()
                                                        }

                                                        app.db('tmp_armas')
                                                            .where({ id_user: data.id_user })
                                                            .then(result => {

                                                                app.db('pedido_arma')
                                                                    .insert(result[0])
                                                                    .then(result => {

                                                                        app.db('tmp_municao')
                                                                            .where({ id_user: data.id_user })
                                                                            .then(result => {

                                                                                app.db('pedido_municao')
                                                                                    .insert(result[0])
                                                                                    .then(result => {

                                                                                        app.db('tmp_acessorio')
                                                                                            .where({ id_user: data.id_user })
                                                                                            .then(result => {

                                                                                                app.db('pedido_acessorio')
                                                                                                    .insert(result[0])
                                                                                                    .then(result => {

                                                                                                        app.db('tmp_client')
                                                                                                            .where({ id_user: data.id_user })
                                                                                                            .then(result => {

                                                                                                                app.db('pedido_client')
                                                                                                                    .insert(result[0])
                                                                                                                    .then(result => {

                                                                                                                        app.db('tmp_total')
                                                                                                                            .where({ id_user: data.id_user })
                                                                                                                            .then(result => {

                                                                                                                                app.db('pedido_total')
                                                                                                                                    .insert(result[0])
                                                                                                                                    .then(result => {

                                                                                                                                        app.models.carrinho.cancelPedido2
                                                                                                                                        res.status().json('Pedido concluido')

                                                                                                                                    }).catch(err => res.status(500).json(err))
                                                                                                                            }).catch(err => res.status(500).json(err))
                                                                                                                    }).catch(err => res.status(500).json(err))
                                                                                                            }).catch(err => res.status(500).json(err))
                                                                                                    }).catch(err => res.status(500).json(err))
                                                                                            }).catch(err => res.status(500).json(err))
                                                                                    }).catch(err => res.status(500).json(err))
                                                                            }).catch(err => res.status(400).json(err))
                                                                    }).catch(err => res.status(500).json(err))
                                                            }).catch(err => res.status(500).json(err))
                                                    }).catch(err => res.status(500).json(err))
                                            }).catch(err => res.status(500).json(err))
                                    }).catch(err => res.status(500).json(err))
                            }).catch(err => res.status(500).json(err))
                    } else {
                        res.status(400).json('Estande ocupado')
                    }
                }).catch(err => res.status(500).json(err))
        } else {
            return res.status(400).json('Estande não informado')
        }
    }
    return {
        getById, getArma, getAcessorio, getClient, getMunicao, getTotal, concluir,
        cancelPedido, cancelPedido2, checkStock, deleteAcessorio, deleteArma, deleteMunicao,
        insertAcessorio, insertArm, insertClient, insertMunicao,
    }
}




