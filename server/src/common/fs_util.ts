import path from 'path';

export class FSUtil {

    /** 將檔案路徑切割為「檔案」與「路徑」。 */
    public static pathSplite(filePath: string) {
        const paths = filePath.split('/').reverse();

        const file = paths.shift()
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        return {
            /** 檔案名稱。 */
            file,
            /** 副檔名。 */
            ext,
            /** 主檔名。 */
            base,
            /** 路徑 */
            path: paths.reverse().join('/')
        }
    }
}