import { query } from "express";
import { createConnection, createPool, Pool } from "mysql";
import { parse } from "uuid";
let pool: Pool | null = null;

const initializeMySqlConnector = () => {
    try {
        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        console.debug('MYSql Adapater Pool Generated Successfully');
        console.log('process.env.MY_SQL_DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, createConnection) => {
            if(err){
                console.log('error mysql failed to connect');
                throw new Error('not able to connect to database');
            }
            else{
                console.log('connection made');
                createConnection.release();
            }
        })
    }
    catch (error){
        console.error('[mysql.connector][initializeMySqlConnector][Error}: ', error);
        throw new Error('failed to inialize pool');
    }
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if(!pool) {
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if(error) reject(error);
                else resolve(results);
            });
        });
    }
    catch (error){
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MYSQL query');
    }
}