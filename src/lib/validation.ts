import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(200),
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  website: z.string().trim().max(250).optional().or(z.literal("")),
  targetRegions: z
    .array(z.enum(["USA", "Canada", "Middle East", "Australia", "Multiple"]))
    .min(1)
    .max(5),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal("")),
  goals: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  websiteConfirm: z.string().max(0).optional().default(""),
});

export const inquiryAdminCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  website: z.string().trim().max(250).optional().or(z.literal("")),
  targetRegions: z.array(z.string().trim().min(1).max(40)).min(1).max(5),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal("")),
  goals: z.string().trim().min(5).max(5000),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "ARCHIVED"]).default("NEW"),
  adminNotes: z.string().max(5000).optional().default(""),
});

export const inquiryAdminUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "ARCHIVED"]),
  adminNotes: z.string().max(5000).default(""),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
});

export const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1).max(120),
  shortDescription: z.string().trim().min(1).max(500),
  description: z.string().max(5000).default(""),
  features: z.array(z.string().trim().min(1).max(300)).max(30).default([]),
  bestFor: z.string().max(500).default(""),
  icon: z.string().max(60).default("target"),
  sortOrder: z.number().int().min(0).max(999).default(0),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().max(160).default(""),
  seoDescription: z.string().max(320).default(""),
});

export const faqSchema = z.object({
  question: z.string().trim().min(2).max(500),
  answer: z.string().trim().min(2).max(5000),
  category: z.string().trim().min(1).max(100).default("General"),
  sortOrder: z.number().int().min(0).max(999).default(0),
  isPublished: z.boolean().default(true),
});

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(14, "Password must be at least 14 characters").max(200),
});

export const pageUpdateSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().max(5000),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  seoTitle: z.string().max(160),
  seoDescription: z.string().max(320),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  sections: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        heading: z.string().optional(),
        body: z.string().optional(),
      }),
    )
    .max(50),
});
