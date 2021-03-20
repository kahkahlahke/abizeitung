import { __prod__ } from "./constants";
import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { Schueler } from "./entities/Schueler";
import { Kommentar } from "./entities/Kommentar";
import { Option } from "./entities/Option";
import { Umfrage } from "./entities/Umfrage";

export default {
    entities: [Schueler, Kommentar, Option, Umfrage], // path to your JS entities (dist), relative to `baseDir`
    dbName: 'abizeitung',
    type: 'postgresql',
    user: "postgres",
    password: "h8.9;0=1",
    migrations: {
        path: path.join(__dirname, '/migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];