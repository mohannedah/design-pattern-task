import { injectable } from "inversify";
import mysql, {Connection, MysqlError, Pool, PoolConnection} from "mysql";

import {promisify} from "util";

@injectable()
export class DbContextNative {
    private readonly connectionPool: Pool;
    constructor() {
        this.connectionPool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            connectionLimit: 50,
        });
       
    }

    private query(queryString: string, options: any[] = []): Promise<any>
    {
        let paramsCount = 0;
        for(let char of queryString) {
            if(char == "?") paramsCount += 1;
        }
        if(paramsCount != options.length) return Promise.reject(new Error("Number of parameters passed does not equal to the arguments needed in the query string"));
        return new Promise<any>((resolve, reject) => {
            this.connectionPool.query(queryString, options, (err, res) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    };


    public getRow(queryString: string, options: any[] = []): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.query(queryString, options).then((res) => {
                if(res.length == 0){ 
                    resolve(null);
                    return;
                } 
                resolve(res[0]);
            }).catch(err => {
                reject(err);
            })
        })
    }
    
    public getAllRows(queryString: string, options: any[] = []): Promise<any[]> {
        return new Promise<any>((resolve, reject) => {
            this.query(queryString, options).then((res) => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }


    public insertOrUpdate(queryString: string, options: any[] = []): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.query(queryString, options).then((res) => {
                resolve(res.affectedRows > 0);
            }).catch(err => {
                console.log("an error occurred")
                reject(err);
            })
        })
    }
}


