import { Hash } from "crypto";

const crypto = require('crypto');

const algorithm = 'aes256';
const key = 'password';
const text = 'I love kittens';



/**@problem общее Шифрование.
 * @class crypt
 * @method decrypted дешифровывает.
 * @method encrypted зишровывает.
 */
export class crypt {

    static decrypted(hash:Hash) {
        const cipher = crypto.createCipher(algorithm, key);
        const decipher = crypto.createDecipher(algorithm, key);
        const decrypted = decipher.update(hash, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    }
    static encrypted(Str:String) {
        const cipher = crypto.createCipher(algorithm, key);
        const encrypted = cipher.update(Str, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    }
}