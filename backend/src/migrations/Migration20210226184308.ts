import { Migration } from '@mikro-orm/migrations';

export class Migration20210226184308 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "umfrage" ("id" serial primary key, "title" varchar(255) not null);');

    this.addSql('create table "option" ("id" serial primary key, "title" varchar(255) not null, "umfrage_id" int4 not null);');

    this.addSql('alter table "kommentar" drop constraint if exists "kommentar_author__id_check";');
    this.addSql('alter table "kommentar" alter column "author__id" type int4 using ("author__id"::int4);');
    this.addSql('alter table "kommentar" alter column "author__id" set not null;');
    this.addSql('alter table "kommentar" drop constraint if exists "kommentar_receiver__id_check";');
    this.addSql('alter table "kommentar" alter column "receiver__id" type int4 using ("receiver__id"::int4);');
    this.addSql('alter table "kommentar" alter column "receiver__id" set not null;');

    this.addSql('create table "schueler_options" ("schueler__id" int4 not null, "option_id" int4 not null);');
    this.addSql('alter table "schueler_options" add constraint "schueler_options_pkey" primary key ("schueler__id", "option_id");');

    this.addSql('alter table "option" add constraint "option_umfrage_id_foreign" foreign key ("umfrage_id") references "umfrage" ("id") on update cascade;');

    this.addSql('alter table "schueler_options" add constraint "schueler_options_schueler__id_foreign" foreign key ("schueler__id") references "schueler" ("_id") on update cascade on delete cascade;');
    this.addSql('alter table "schueler_options" add constraint "schueler_options_option_id_foreign" foreign key ("option_id") references "option" ("id") on update cascade on delete cascade;');
  }

}
