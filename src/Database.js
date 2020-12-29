const sqlite3 = require('sqlite3').verbose();
const users = require('./users.json');


class PromiseDB {
    constructor() {
        this.db = new sqlite3.Database('./trollio.db');
    }

    all(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        });
    }

    get(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            })
        });
    }

    run(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    close() {
        this.db.close()
    }
}

async function migration(id, sql) {
    let db = new PromiseDB();

    const rows = await db.all("SELECT id FROM migrations where id = ?", [id]);
    if (rows.length === 0) {
        console.log("Applying migration", id);
        await db.run(sql);
        await db.run("INSERT INTO migrations values (?)", [id]);
    }

    db.close()
}

async function migrate() {
    console.log("Starting DB migration");

    let db = new PromiseDB();
    await db.run("CREATE TABLE IF NOT EXISTS migrations (id integer)", []);
    db.close();

    // Run migrations
    await migration(1, "CREATE TABLE scores (user text, sent integer, received integer)");

    let values = users.map(user => { return `('${user}', 0, 0)` });
    await migration(2, "INSERT INTO scores VALUES " + values.join(', '));
    
    console.log("Finished DB migration");
}

module.exports = { PromiseDB, migrate };
