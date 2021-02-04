import { Entity, PrimaryKey, SerializedPrimaryKey, Property, ManyToOne, ManyToMany, Collection } from "@mikro-orm/core";
import { Schueler } from "./Schueler";

@Entity()
export class Kommentar {

  @PrimaryKey()
  _id: number;


  @Property()
  content: string;

  @ManyToOne(() => Schueler)
  author: Schueler;

  @ManyToOne(() => Schueler)
  receiver: Schueler;
}