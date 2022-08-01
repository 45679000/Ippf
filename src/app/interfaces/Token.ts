export interface Token {
    username:string,
    realm: string,
    nonce:string,
    role: string,
    authtype: string,
    exp: number,
    rights: string[]
}