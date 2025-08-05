import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const postStatusEnum = ["DELETED", "WIP", "NOT_PUBLISH", "PUBLISHED"] as const;

export const roleEnum = ["ADMIN", "EDITOR", "USER"] as const 

// 用户表
export const users = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  hashedRefreshToken: text("hashed_refresh_token"),
  role: text({ enum: roleEnum }).default("USER").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// 帖子表
export const posts = sqliteTable("post", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  desc: text("desc"),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  publishDate: integer("publish_date", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  img: text("img"),
  views: integer("views").default(0).notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  status: text({ enum: postStatusEnum }).default("PUBLISHED").notNull(),
});

// 评论表
export const comments = sqliteTable("comment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
});

// 分类表
export const categories = sqliteTable("category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").unique().notNull(),
  img: text("img"),
});

// 帖子-分类关联表（多对多）
export const postCategories = sqliteTable(
  "post_category",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  })
);

// 关系定义（用于查询时关联）
export const userRelations = relations(users, ({ many }) => ({
  comments: many(comments),
  posts: many(posts),
}));

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  categories: many(postCategories),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

export const postCategoryRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));
