const PromiseDB = require('./Database.js').PromiseDB;


async function getAll() {
    let db = new PromiseDB();
    let scores = await db.all(`
        SELECT name, email, sent, received 
        FROM users 
        WHERE sent > 0 or received > 0 
        order by sent desc, name 
        limit 10
    `);
    db.close();
    return scores
}


module.exports = { getAll };
