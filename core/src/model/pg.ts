import { env } from "../config/env"
import { Pool as PGPoll, PoolConfig as IPGPoolConfig } from 'pg';

interface ISQLExecutor {
    execute<T>(query: string, params: any[]): Promise<T[]>;
}

abstract class SQLExecutorBase implements ISQLExecutor {
    abstract execute<T>(query: string, params: any[]): Promise<T[]>;
}
type ConnectType = 'PG' | 'Mongo' 

class PG_SQLExecutor extends SQLExecutorBase {
    private pool: PGPoll;

    constructor(conn: string) {
        super();
        const sqlConn: IPGPoolConfig = JSON.parse(conn);
        this.pool = new PGPoll(sqlConn);
    }

    async execute<T>(query: string, params: any[]) {
        const result = await this.pool.query<T>(query, params);
        return result.rows;
    }
}

function factoryDbExecutor(type: ConnectType, conn: string) {
    switch (type) {
      case 'PG':
        return new PG_SQLExecutor(conn);
      default:
        throw new Error('factoryDbExecutor not imlemented')
    }
  }