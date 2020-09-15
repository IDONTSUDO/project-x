const { Client } = require('pg');
const client = new Client({
    user: 'USER',
    host: 'localhost',
    database: 'dbname',
    password: 'myPassword',
    port: 5432
});
(async () => {
    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message); // Hello world!
    await client.end();
})();
//# sourceMappingURL=main.js.map