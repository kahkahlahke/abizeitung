import { Migration } from '@mikro-orm/migrations';

export class Migration20210226184912 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "option" add column "number_of" int4 not null;');
  }

}
