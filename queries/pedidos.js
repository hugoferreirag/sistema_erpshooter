module.exports = app =>{
    const rawPayment = {
         estoque: (item) => `UPDATE estoque SET quantity = quantity + '${item.newqtd}', oldQtd = oldQtd + '${item.newqtd}' WHERE caliber = '${item.calibre}' AND provider = '${item.fornecedor}'`,
         amooRequest:(item) => `UPDATE ammoRequest SET quantity = quantity - '${item.newqtd}', subTotal = subTotal - '${item.newsub}' WHERE id = '${item.id}' 
         AND requestCode = '${item.cod_pedido}'`,
         totalRequest:(item) => `UPDATE ammoRequest SET quantity = quantity - '${item.newqtd}', subTotal = subTotal - '${item.newsub}' WHERE id = '${item.id}' 
         AND requestCode = '${item.cod_pedido}''`
    }

    const rawGetRequest = () => `SELECT
    c.stand,
    a.cod_pedido,
    a.name_client,
    a.cod_cliente,
    a.id_user,
    b.total
    FROM
        pedido c INNER JOIN pedido_client a ON(a.cod_pedido = c.cod_pedido) INNER JOIN pedido_total b ON(b.cod_pedido = c.cod_pedido) WHERE status = false AND date = DATE(NOW())`

   const rawGetRequestClosedToday = () =>`SELECT
   c.stand,
   a.cod_pedido,
   a.name_client,
   a.cod_cliente,
   a.id_user,
   b.total
   FROM
       pedido c
   INNER JOIN pedido_client a ON(a.cod_pedido = c.cod_pedido)
   INNER JOIN pedido_total b ON(b.cod_pedido = c.cod_pedido) WHERE status = true  AND date= DATE(NOW()) `

   const rawGetAllRequestClosed = () => `SELECT
   c.stand,
   a.cod_pedido,
   a.name_client,
   a.cod_cliente,
   a.id_user,
   b.total
   FROM
       pedido c
   INNER JOIN pedido_client a ON(a.cod_pedido = c.cod_pedido)
   INNER JOIN pedido_total b ON(b.cod_pedido = c.cod_pedido) WHERE status = true`   
   
   const rawGetSummaryClosedRequest = (item) => `SELECT
   c.stand,
   c.entrada,
   c.saida,
   c.id,
   c.date,
   a.cr_client,
   a.cpf_client,
   a.name_client,
   a.cod_cliente,
   a.cnh_client,
   a.id_user,
   b.total,
   b.desconto,
   u.nome
   FROM
       pedido c
   INNER JOIN pedido_client a ON(a.cod_pedido = c.cod_pedido)
   INNER JOIN users u ON(u.id = c.id_user)
   INNER JOIN pedido_total b ON(b.cod_pedido = c.cod_pedido) WHERE c.cod_pedido = '${item.id}'` 

   

    return { rawPayment }
}