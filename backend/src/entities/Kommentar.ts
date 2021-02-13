import { Entity, PrimaryKey, SerializedPrimaryKey, Property, ManyToOne, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { Schueler } from "./Schueler";

@Entity()
export class Kommentar {

  @PrimaryKey()
  _id: number;


  @Property()
  content: string;

  @ManyToOne(() => Schueler, {onDelete: "CASCADE"})
  author?: Schueler;

  @ManyToOne(() => Schueler, {onDelete: "CASCADE"})
  receiver?: Schueler;
}