let Database =require("./Database");

class District{
    constructor(){
        this.id = 0;
        this.name = "";
        this.stateid = 0;
        this.sql = "";
        this.db = new Database();
    }
    
    save(){
        if(this.id == 0){
            this.sql = "INSERT INTO districts(name, stateid) ";
            this.sql += "VALUES('" + this.name.replace(/'/g, "''") + "', " + this.stateid + ")";
        }
        else{
            this.sql = "UPDATE districts SET name = '" + this.name.replace(/'/g, "''") + "', stateid = " + this.stateid + " ";
            this.sql += "WHERE id = " + this.id;
        }
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            });
        });
    }

    get(){
        this.sql = "SELECT * FROM districts WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }

    list(){
        this.sql = "SELECT D.*, S.name AS statename ";
        this.sql += "FROM districts AS D INNER JOIN states AS S ON S.id = D.stateid ";
        if(this.stateid != 0)
            this.sql += "WHERE D.stateid = " + this.stateid + " ";
        this.sql += "ORDER BY D.name";
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }

    delete(){
        this.sql = "DELETE FROM districts WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }
}

module.exports = District;