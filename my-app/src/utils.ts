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
} | null