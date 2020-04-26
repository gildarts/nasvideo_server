/**
 * 資料庫相關初始設定。
 *
 * Library：https://github.com/vitaly-t/pg-promise
 * Example : https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#single-parameter
 * TypeScript Ext Document：https://github.com/vitaly-t/pg-promise/tree/master/typescript
 */

import PGP from 'pg-promise';
import conf from '../config';
import PG from 'pg-promise';

import { MongoClient } from 'mongodb';

/** mongo db client。 */
export const bsonDB = new MongoClient(`mongodb://${conf.bson.uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    poolSize: 6,
});

const pgp = PG();

/**資料庫操作介面 */
export interface PGConnection extends PGP.IDatabase<any> {
}

/** 資料庫連線 instance。 */
export const db = {
    /** 預設資料庫連線(字音字形網資料庫)。 */
    default: pgp<PGConnection>(conf.db),
    /** mongo db 資料庫。 */
    mongo: null,
} as {
    default: PGConnection,
    mongo: MongoClient
}

