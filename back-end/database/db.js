const mysql = require('mysql')

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
      });
      console.log('¡Conectado a la base de datos MySQL!')
      Database.instance = this;
    }
    return Database.instance.connection;
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = new Database();


// const connectionDB = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE
// })

// connectionDB.connect((error) => {
//   if (error) {
//     console.log('El error de conexión es: ' + error)
//     return
//   }
//   console.log('¡Conectado a la base de datos MySQL!')
// })

// module.exports = connectionDB