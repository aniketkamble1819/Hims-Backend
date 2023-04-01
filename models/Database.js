let mysql = require("mysql");

class Database {

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "hims"
        });
    }

    query(sql, promise){
        return new Promise((resolve, reject)=>{
            this.con.connect((err)=>{
                if(err){
                  reject(err);
                }
                this.con.query(sql, promise, (err, result)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                })
            })
        })
        
    }
}

module.exports = Database;