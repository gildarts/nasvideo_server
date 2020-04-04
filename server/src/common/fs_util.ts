
export class FSUtil {

    /** 將檔案路徑切割為「檔案」與「路徑」。 */
    public static pathSplite(filePath: string) {
        const paths = filePath.split('/').reverse();

        return {
            file: paths.shift(),
            path: paths.reverse().join('/')
        }
    }
}