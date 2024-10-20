/* eslint-disable no-console */
import type { Table } from "drizzle-orm";

import { getTableName, sql } from "drizzle-orm";

import type { DbType } from "@/db";

import db from "@/db";
import * as schema from "@/db/schema";

import * as seeds from "./seeds";

if (!Bun.env.DB_SEEDING) {
  throw new Error("You must set DB_SEEDING to \"true\" when running seeds");
}

async function resetTable(db: DbType, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function seedDatabases() {
  for (const table of [
    schema.orderMenuItem,
    schema.orderStatus,
    schema.order,
    schema.address,
    schema.user,
    schema.menuItem,
    schema.category,
    schema.statusCatalog,
    schema.restaurant,
    schema.city,
    schema.state,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.category(db);
  await seeds.statusCatalog(db);
  await seeds.state(db);
  await seeds.city(db);
  await seeds.restaurant(db);
  await seeds.user(db);
  await seeds.order(db);
}

console.time("SEEDING");
seedDatabases();
console.time("SEEDING");
