import { Entity, Property, ManyToOne, IdentifiedReference, ManyToMany, Collection, PrimaryKey, OneToMany } from "@mikro-orm/core";
import { Option } from "./Option";


@Entity()
export class Umfrage {

  @PrimaryKey()
  id: number;

  @Property()
  title!: string;

  @OneToMany( () => Option, option => option.umfrage )
  options? = new Collection<Option>(this);

}