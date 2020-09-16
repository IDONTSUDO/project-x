const { Client } = require('pg')
const client = new Client({
    user: 'yourname',
    host: 'localhost',
    database: 'dbname',
    password: 'yourpassword',
    port: 5432
})
;(async () => {
  const test = `CREATE OR REPLACE FUNCTION notify_new_order()
  RETURNS trigger AS
$BODY$
    BEGIN
        PERFORM pg_notify('new_order', row_to_json(NEW)::text);
        RETURN NULL;
    END; 
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;`
  await client.connect()
  const res = await client.query(test)

  console.log(res) 
  await client.end()
})();