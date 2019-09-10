module.exports = app => {
    const rawConsumption = (date) => `SELECT SUM(m.quantity) as qtd, m.id, m.caliber, m.quantity, m.undValue, m.ammoClub, m.subTotal,m.userId,
    c.customerName,c.customerCpf,p.id,p.activity,p.date,p.customerCode,u.name
    FROM  pedido p
    INNER JOIN customerRequest c ON(c.requestCode= p.requestCode)
    INNER JOIN users u ON(u.id= p.userId)
    INNER JOIN ammoRequest m ON(m.requestCode = p.requestCode) WHERE p.status = 1 
    AND  p.date BETWEEN '${date.start}' AND  '${date.end}'  GROUP BY m.caliber`

    const rawFinancial = (date) => `SELECT SUM(m.quantity) as quantity,SUM(b.total) as total, m.id, m.caliber, m.undValue, m.ammoClub, m.subTotal,m.userId,
    c.customerName,c.customerCpf,p.id,p.activity,p.date,p.customerCode,u.name
    FROM
        pedido p
    INNER JOIN customerRequest c ON(c.requestCode= p.requestCode)
    INNER JOIN totalRequest b ON(b.requestCode= p.requestCode)
    INNER JOIN users u ON(u.id= p.userId)
    INNER JOIN ammoRequest m ON(m.requestCode = p.requestCode) WHERE
    p.status = 1  
    AND  p.date BETWEEN '${date.start}'
    AND  '${date.end}'  GROUP BY c.customerName, m.caliber`

    const rawMissing = ()=> `SELECT * FROM clientes WHERE crNumber != '' AND presence = 0 AND crDate  BETWEEN crDate  AND  date_add(crDate, interval 1 year)`
    
    const rawStrategy = {
        strategy90 : (date) => `SELECT *,  DATEDIFF(crDate, date_sub(crDate, interval 1 year)) as days FROM clientes WHERE crNumber != '' AND presence < 4 AND date(now()) BETWEEN date_add(crDate, interval '${date}' day)
        AND  date_add(crDate, interval 365 day)`,
        strategy60 : (date) => `SELECT *,  DATEDIFF(crDate, date_sub(crDate, interval 1 year)) as days FROM clientes WHERE crNumber != '' AND presence >= 4 AND presence <=6 date(now()) BETWEEN date_add(crDate, interval '${date}' day)
        AND  date_add(crDate, interval 365 day)`,
        strategy30 : (date) => `SELECT *,  DATEDIFF(crDate, date_sub(crDate, interval 1 year)) as days FROM clientes WHERE crNumber != '' AND presence >= 6 AND presence <=8 date(now()) BETWEEN date_add(crDate, interval '${date}' day)
        AND  date_add(crDate, interval 365 day)`,
        strategyDefault : () => `SELECT *, DATEDIFF(crDate, date_sub(crDate, interval 1 year)) as days FROM clientes WHERE presence < 9 AND crDate BETWEEN crDate
        AND  date_add(crDate, interval 365 day)`
    }

    const rawHabituality = (id) => `SELECT customerCode, date FROM pedido WHERE customerCode = '${id}' GROUP BY date`
    
    const dateRawHabituality = (item) => `SELECT
    a.id,
    a.arm,
    a.caliber,
    a.model,
    a.numeration,
    a.club,
    SUM(m.quantity) as qtd,
    p.activity,
    p.date,
    p.customerCode
    FROM
        pedido p
    INNER JOIN ammoRequest m ON(m.requestCode = p.requestCode)
    JOIN armRequest a ON(a.requestCode = p.requestCode) WHERE p.customerCode = '${item.id}' AND p.date = '${item.date}' GROUP BY p.requestCode, a.arma`


    return { rawConsumption, rawFinancial, rawMissing, rawStrategy, dateRawHabituality, rawHabituality }
}