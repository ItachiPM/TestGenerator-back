import * as crypto from "crypto";

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', ' 02uqt034t gjawipejf a0f q0thqfwpaiojf0Q[PjJrpoJPJR P3JT9pjwRPFe0[tpgj[eq PJTRPJF;ADLS FJSDGANGIOWPAEJGldmG[eg]]')
    hmac.update(p)
    return hmac.digest('hex')
}
