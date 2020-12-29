const PromiseDB = require('./Database.js').PromiseDB;


async function newUser(email) {
    let db = new PromiseDB();
    let row = await db.get('SELECT email FROM scores where email = ?', [email]);
    if (!row) {
        await db.run('INSERT VALUES INTO scores (?, 0, 0)', [email]);
    }
    db.close();
}


async function getAll() {
    let db = new PromiseDB();
    let scores = await db.all('SELECT user, sent, received from scores order by sent desc limit 100');
    db.close();
    return scores
}


module.exports = { newUser, getAll };
