import { pgTable, uuid, text, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  uid: uuid('uid').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  phone: text('phone'),
  type: text('type').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const craftspeople = pgTable('craftspeople', {
  id_craft: uuid('id_craft').primaryKey().defaultRandom(),
  uid: uuid('uid').unique().notNull().references(() => users.uid),
  nom_business: text('nom_business').notNull(),
  description: text('description'),
  category: text('category'),
  experience_years: integer('experience_years'),
  location: text('location'),
  created_at: timestamp('created_at').defaultNow(),
});

export const services = pgTable('services', {
  id_serv: uuid('id_serv').primaryKey().defaultRandom(),
  id_craft: uuid('id_craft').notNull().references(() => craftspeople.id_craft),
  nom: text('nom').notNull(),
  description: text('description'),
  prix: decimal('prix', { precision: 10, scale: 2 }),
  duree_estimee: integer('duree_estimee'),
  created_at: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id_review: uuid('id_review').primaryKey().defaultRandom(),
  uid: uuid('uid').notNull().references(() => users.uid),
  id_craft: uuid('id_craft').notNull().references(() => craftspeople.id_craft),
  note: integer('note').notNull(),
  date: timestamp('date').defaultNow(),
});

export const photos = pgTable('photos', {
  id_photo: uuid('id_photo').primaryKey().defaultRandom(),
  id_craft: uuid('id_craft').references(() => craftspeople.id_craft),
  id_serv: uuid('id_serv').references(() => services.id_serv),
  url: text('url').notNull(),
  type: text('type'),
  created_at: timestamp('created_at').defaultNow(),
});