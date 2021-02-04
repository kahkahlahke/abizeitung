import { Migration } from '@mikro-orm/migrations';

export class Migration20210203141829 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "schueler" ("_id" serial primary key, "name" varchar(255) not null, "kurs" int2 not null, "description" text not null, "image" varchar(255) not null);');

    this.addSql('create table "kommentar" ("_id" serial primary key, "content" varchar(255) not null, "author__id" int4 not null, "receiver__id" int4 not null);');

    this.addSql('alter table "kommentar" add constraint "kommentar_author__id_foreign" foreign key ("author__id") references "schueler" ("_id") on update cascade;');
    this.addSql('alter table "kommentar" add constraint "kommentar_receiver__id_foreign" foreign key ("receiver__id") references "schueler" ("_id") on update cascade;');
  }

}
