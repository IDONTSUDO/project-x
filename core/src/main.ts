const { Client } = require('pg')
const client = new Client({
    user: 'yourname',
    host: 'localhost',
    database: 'dbname',
    password: 'yourpassword',
    port: 5432
})
;(async () => { 
  await client.end()
})();