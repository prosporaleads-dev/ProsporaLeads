export type AdminRole = "SUPER_ADMIN" | "EDITOR";

export type InquiryStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "ARCHIVED";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "ARCHIVED",
];

export const TARGET_REGIONS = [
  "USA",
  "Canada",
  "Middle East",
  "Australia",
  "Multiple",
] as const;

export const SERVICE_ICON_OPTIONS = [
  { value: "target", label: "Target" },
  { value: "calendar-check", label: "Calendar" },
  { value: "mail", label: "Mail" },
  { value: "network", label: "Network" },
  { value: "map", label: "Map" },
  { value: "database", label: "Database" },
] as const;

export interface AdminService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  bestFor: string;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ServicePayload = Omit<AdminService, "id" | "createdAt" | "updatedAt">;

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  targetRegions: string[];
  serviceInterest: string | null;
  goals: string;
  consent: boolean;
  status: string;
  adminNotes: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryCreatePayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  targetRegions: string[];
  serviceInterest?: string;
  goals: string;
  status?: InquiryStatus;
  adminNotes?: string;
}

export interface InquiryUpdatePayload {
  status: InquiryStatus;
  adminNotes: string;
  serviceInterest?: string;
  company?: string;
  phone?: string;
}

export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type FaqPayload = Omit<AdminFaq, "id" | "createdAt" | "updatedAt">;

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdatePayload {
  name: string;
  email: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DashboardData {
  adminName: string;
  adminRole: AdminRole;
  counts: {
    pages: number;
    publishedPages: number;
    services: number;
    publishedServices: number;
    inquiries: number;
    newInquiries: number;
    faqs: number;
    publishedFaqs: number;
  };
  statusBreakdown: Record<InquiryStatus, number>;
  recentInquiries: Array<{
    id: string;
    name: string;
    email: string;
    company: string | null;
    serviceInterest: string | null;
    targetRegions: string[];
    status: string;
    createdAt: string;
  }>;
  contactEmail: string;
}
