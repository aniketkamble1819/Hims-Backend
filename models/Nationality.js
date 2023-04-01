let Database = require("./Database");


class Nationality{
    constructor(){
        this.id = "",
        this.name = "",
        this.sql ="",
        this.db = new Database();

    }
    save(){
        if (this.id == 0) {
            this.sql = `INSERT INTO nationalities(name) VALUES ('${this.name.replace(/'/g, "''")}')`;

        }
        else {
            this.sql = `UPDATE nationalities SET name = '${this.name.replace(/'/g, "''")}' WHERE id = ${
                this.id
            }`;
        }
        return new Promise((resolve, reject) => {
            this.db.query(this.sql).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err);

            })


        })
    }

    list(){
        this.sql = "SELECT * FROM nationalities ORDER BY name";
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result)
            }, (err)=>{
                reject(err);     
            })
        })
    };

    get(){
        this.sql = "SELECT * FROM nationalities WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }

    delete(){
        this.sql = "DELETE FROM nationalities WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }
}
 
module.exports = Nationality;