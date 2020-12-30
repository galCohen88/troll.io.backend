const PromiseDB = require('./Database.js').PromiseDB;


async function getAll() {
    let db = new PromiseDB();
    let scores = await db.all(`
        SELECT name, email, sent, received 
        FROM users 
        order by sent desc, received desc, name
    `);
    db.close();
    return scores
}

async function update(sender, receiver) {
    let db = new PromiseDB();
    await db.run("UPDATE users SET sent = sent + 1 WHERE email = ?", [sender]);
    await db.run("UPDATE users SET received = received + 1 WHERE email = ?", [receiver]);
    db.close();
}

module.exports = { getAll, update };
