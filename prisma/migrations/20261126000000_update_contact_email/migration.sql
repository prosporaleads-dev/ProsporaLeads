-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "contactEmail" SET DEFAULT 'info@prosporaleads.com';

-- Update existing placeholder email if present
UPDATE "SiteSettings"
SET "contactEmail" = 'info@prosporaleads.com'
WHERE "contactEmail" = 'hello@example.com' OR "contactEmail" = '';
