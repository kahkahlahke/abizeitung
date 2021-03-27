export enum Kurs{
    EN1 = 0,
    MA1,
    BIO1,
    DE1,
    PH1,
    CH1,
    LA1,
    GE1
}
export type Student = {
    name: string;
    image: string;
    description: string;
    kurs: number;
    _id: number;
    superuser: boolean;
} | null

export const genericGet = async (url: string) => {
    const res = await fetch(url, {credentials: "include"});
    const data = res.json();
    return data;
}

export const genericPost = async (url: string, body: object) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: "include"
    }
    await fetch(url, options as RequestInit)
}