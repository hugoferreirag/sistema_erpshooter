module.exports = app => {  
    const currentStock = {
        track:() => `SELECT SUM(m.quantidade) as quantidade FROM pedido p INNER JOIN pedido_municao m ON (m.cod_pedido = p.cod_pedido ) WHERE p.status = 0`,
        launch:() => `SELECT SUM(lancamento) FROM estoque`,
        exit:() => `SELECT SUM(m.quantidade) as quantidade FROM pedido p INNER JOIN status_caixa c INNER JOIN pedido_municao m ON (m.cod_pedido = p.cod_pedido ) WHERE p.status = 1 AND c.status = 1 AND p.saida > c.date`,
        remaining:() => `SELECT SUM(quantidade) FROM estoque`
    }

    const rawRemainingMunitions = () => `SELECT  SUM(quantidade) as quantidade FROM estoque GROUP BY calibre` 
    const rawexitMunitions = () => `SELECT SUM(m.quantidade) as quantidade FROM pedido p INNER JOIN status_caixa c INNER JOIN pedido_municao m ON (m.cod_pedido = p.cod_pedido ) WHERE p.status = 1 AND c.status = 1 AND p.saida > c.date GROUP BY m.calibre`
    const rawTrackMunitions =() => `SELECT SUM(m.quantidade) as quantidade FROM pedido p INNER JOIN pedido_municao m ON (m.cod_pedido = p.cod_pedido ) WHERE p.status = 0 GROUP BY m.calibre`
    const rawLaunch = () => `SELECT  SUM(lancamento) as lancamento FROM estoque GROUP BY calibre`  

    const rawRemainingMunitionsName = () => `SELECT calibre, SUM(quantidade) as quantidade FROM estoque GROUP BY calibre`
    const rawTrackMunitionsName = () => `SELECT m.calibre FROM pedido p INNER JOIN pedido_municao m ON (m.cod_pedido = p.cod_pedido ) WHERE p.status = 0 GROUP BY m.calibre`
    return { currentStock, rawRemainingMunitions, rawRemainingMunitionsName, rawTrackMunitions, rawTrackMunitionsName, rawexitMunitions, rawLaunch }
}