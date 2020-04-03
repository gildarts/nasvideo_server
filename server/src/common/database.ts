/**
 * 資料庫相關初始設定。
 *
 * Library：https://github.com/vitaly-t/pg-promise
 * Example : https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#single-parameter
 * TypeScript Ext Document：https://github.com/vitaly-t/pg-promise/tree/master/typescript
 */

import PGP from 'pg-promise';
import * as conf from '../config.json';
import PG from 'pg-promise';

const pgp = PG();

/**資料庫操作介面 */
export interface PGConnection extends PGP.IDatabase<any> {
}

/** 資料庫連線 instance。 */
export const db = {
    /** 預設資料庫連線(字音字形網資料庫)。 */
    default: pgp<PGConnection>(conf.db)
}

