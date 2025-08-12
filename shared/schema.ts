import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const timelineEvents = pgTable("timeline_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  order: varchar("order").notNull(),
  isActive: boolean("is_active").notNull().default(false),
});

export const thoughts = pgTable("thoughts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tag: text("tag").notNull(),
  readTime: text("read_time"),
  imageGradient: text("image_gradient"),
  date: text("date").notNull(),
  status: text("status").$type<'wip' | 'published'>(),
});

export const experiments = pgTable("experiments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  timeframe: text("timeframe"),
  description: text("description").notNull(),
  collaborators: text("collaborators").array(),
  technologies: text("technologies").array(),
  isActive: boolean("is_active").notNull().default(false),
  status: text("status").$type<'wip' | 'shipped' | 'sunset'>(),
  collaborationType: text("collaboration_type").$type<'solo' | 'collaboration'>(),
  problemType: text("problem_type").$type<'horizontal' | 'vertical'>(),
  imageGradient: text("image_gradient"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({
  id: true,
});

export const insertThoughtSchema = createInsertSchema(thoughts).omit({
  id: true,
});

export const insertExperimentSchema = createInsertSchema(experiments).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
export type Thought = typeof thoughts.$inferSelect;
export type InsertThought = z.infer<typeof insertThoughtSchema>;
export type Experiment = typeof experiments.$inferSelect;
export type InsertExperiment = z.infer<typeof insertExperimentSchema>;