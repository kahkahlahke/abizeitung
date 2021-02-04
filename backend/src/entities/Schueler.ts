import { Entity, PrimaryKey, SerializedPrimaryKey, Property, ManyToOne, ManyToMany, Collection, OneToMany, Enum } from "@mikro-orm/core";
import { Kommentar } from "./Kommentar";

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

@Entity()
export class Schueler {

  @PrimaryKey()
  _id: number;

  @Property()
  name: string;

  @Enum()
  kurs: Kurs;

  @Property({type: "text"})
  description: string;

  @Property()
  image: string;

  @OneToMany(() => Kommentar, comment => comment.author)
  writtenComments? = new Collection<Kommentar>(this);

  @OneToMany(() => Kommentar, comment => comment.receiver)
  receivedComments? = new Collection<Kommentar>(this);
}