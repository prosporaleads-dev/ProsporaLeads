import { z } from "zod";
export const loginSchema = z.object({ email: z.email().max(254), password: z.string().min(1).max(200) });
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120), email: z.email().max(254), phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")), website: z.string().trim().max(250).optional().or(z.literal("")),
  targetRegions: z.array(z.enum(["USA", "Canada", "Middle East", "Australia", "Multiple"])).min(1).max(5),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal("")), goals: z.string().trim().min(10).max(5000), consent: z.literal(true),
  websiteConfirm: z.string().max(0).optional().default("")
});
export const pageUpdateSchema = z.object({ title: z.string().trim().min(1).max(160), description: z.string().max(5000), status: z.enum(["DRAFT", "PUBLISHED"]), seoTitle: z.string().max(160), seoDescription: z.string().max(320), canonicalUrl: z.string().url().optional().or(z.literal("")), sections: z.array(z.object({ id: z.string(), type: z.string(), heading: z.string().optional(), body: z.string().optional() })).max(50) });
