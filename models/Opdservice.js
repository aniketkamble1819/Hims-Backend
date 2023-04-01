let Database = require("./Database");


class Opdservice{
    constructor(){
        this.id = "",
        this.srno = "",
        this.defaultrate = "",
        this.defaultfrate = "",
        this.name = "",
        this.sql ="",
        this.db = new Database();
    }
    save(){
        if (this.id == 0) {
            this.sql = `INSERT INTO opdservices(srno,name,defaultrate,defaultfrate) VALUES(${this.srno},'${this.name.replace(/'/g, "''")}',${this.defaultrate},${this.defaultfrate})`;
        }
        else {
            this.sql = `UPDATE opdservices SET srno = ${this.srno}, name ='${this.name.replace(/'/g, "''")}',defaultrate = ${this.defaultrate}, defaultfrate = ${this.defaultfrate} WHERE id = ${this.id}`;
            // this.sql = "UPDATE users SET srno = '" + this.srno + "',";
            // this.sql += "name = '" + this.name + "',";
            // this.sql += "defaultrate = '" + this.defaultrate + "',";
            // this.sql += "defaultfrate  = '" + this.defaultfrate+ "',";
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
        this.sql = "SELECT * FROM opdservices ORDER BY srno";
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result)
            }, (err)=>{
                reject(err);     
            })
        })
    };

    get(){
        this.sql = "SELECT * FROM opdservices WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }

    delete(){
        this.sql = "DELETE FROM opdservices WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }

    getrates(doctorid, categoryid, opdserviceid){
        this.sql = "SELECT OS.id, OS.name, OS.defaultrate, DCR.rate, OS.defaultfrate, DCR.frate ";
        this.sql += "FROM opdservices AS OS LEFT OUTER JOIN doctorcategorywiseopdservicerates AS DCR ";
        this.sql += "ON OS.id = DCR.opdserviceid AND DCR.doctorid = " + doctorid + " ";
        this.sql += "AND DCR.categoryid = " + categoryid+ " ";
        if(opdserviceid != 0)
            this.sql += "WHERE OS.id = " + opdserviceid + " ";
        this.sql += "ORDER BY OS.srno";
        console.log(this.sql);
        return new Promise((resolve, reject)=>{
            this.db.query(this.sql).then((result)=>{
                resolve(result);
            }, (err)=>{
                reject(err);
            })
        })
    }
}
 
module.exports = Opdservice;