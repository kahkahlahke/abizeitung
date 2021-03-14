import { Collection, Entity,  ManyToMany, ManyToOne,  PrimaryKey, Property } from "@mikro-orm/core";
import { Schueler } from "./Schueler";
import { Umfrage } from "./Umfrage";

@Entity()
export class Option  {

  @PrimaryKey()
  id: number;

  @Property()
  title!: string;

  @Property()
  numberOf: number;

  @ManyToOne(() => Umfrage)
  umfrage!: Umfrage;

  @ManyToMany(() => Schueler, schueler => schueler.options)
  voters? = new Collection<Schueler>(this);

}