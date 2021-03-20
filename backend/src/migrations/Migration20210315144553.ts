import { Migration } from '@mikro-orm/migrations';

export class Migration20210315144553 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "umfrage" ("id" serial primary key, "title" varchar(255) not null);');

    this.addSql('create table "option" ("id" serial primary key, "title" varchar(255) not null, "number_of" int4 not null, "umfrage_id" int4 not null);');

    this.addSql('create table "schueler" ("_id" serial primary key, "name" varchar(255) not null, "password" varchar(255) not null, "kurs" int2 not null, "description" text not null, "image" varchar(255) not null, "superuser" bool not null default false);');
    this.addSql('alter table "schueler" add constraint "schueler_name_unique" unique ("name");');

    this.addSql('create table "kommentar" ("_id" serial primary key, "content" varchar(255) not null, "author__id" int4 not null, "receiver__id" int4 not null);');

    this.addSql('create table "schueler_options" ("schueler__id" int4 not null, "option_id" int4 not null);');
    this.addSql('alter table "schueler_options" add constraint "schueler_options_pkey" primary key ("schueler__id", "option_id");');

    this.addSql('alter table "option" add constraint "option_umfrage_id_foreign" foreign key ("umfrage_id") references "umfrage" ("id") on update cascade;');

    this.addSql('alter table "kommentar" add constraint "kommentar_author__id_foreign" foreign key ("author__id") references "schueler" ("_id") on update cascade on delete CASCADE;');
    this.addSql('alter table "kommentar" add constraint "kommentar_receiver__id_foreign" foreign key ("receiver__id") references "schueler" ("_id") on update cascade on delete CASCADE;');

    this.addSql('alter table "schueler_options" add constraint "schueler_options_schueler__id_foreign" foreign key ("schueler__id") references "schueler" ("_id") on update cascade on delete cascade;');
    this.addSql('alter table "schueler_options" add constraint "schueler_options_option_id_foreign" foreign key ("option_id") references "option" ("id") on update cascade on delete cascade;');
  }

}
