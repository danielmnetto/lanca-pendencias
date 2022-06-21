const sqlite = require('sqlite')

async function setup () {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite.Database
  })
  await db.migrate({ force: 'last' })
}

setup()