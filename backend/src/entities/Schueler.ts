import { Entity, PrimaryKey, SerializedPrimaryKey, Property, ManyToOne, ManyToMany, Collection, OneToMany, Enum, Cascade } from "@mikro-orm/core";
import { Kommentar } from "./Kommentar";
import { Option } from "./Option";

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

  @Property({unique: true})
  name: string;

  @Property()
  password: string;

  @Enum()
  kurs: Kurs;

  @Property({type: "text"})
  description: string;

  @Property()
  image: string;

  @Property({default: false})
  superuser: boolean;

  @OneToMany(() => Kommentar, comment => comment.author, {mappedBy: "author", cascade: [Cascade.REMOVE]})
  writtenComments? = new Collection<Kommentar>(this);

  @OneToMany(() => Kommentar, comment => comment.receiver, {mappedBy: "receiver", cascade: [Cascade.REMOVE]})
  receivedComments? = new Collection<Kommentar>(this);

  @ManyToMany(() => Option, option => option.voters, {owner: true})
  options? = new Collection<Option>(this);
}