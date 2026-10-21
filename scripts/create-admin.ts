import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, AdminRole } from "@prisma/client";
const prisma = new PrismaClient();
async function main() { const name=process.env.ADMIN_NAME; const email=process.env.ADMIN_EMAIL?.toLowerCase(); const password=process.env.ADMIN_PASSWORD; if(!name||!email||!password||password.length<14||password.includes("change-this-password")) throw new Error("Set ADMIN_NAME, ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 14 characters in .env first."); const passwordHash=await bcrypt.hash(password,12); const user=await prisma.adminUser.upsert({where:{email},create:{name,email,passwordHash,role:AdminRole.SUPER_ADMIN},update:{name,passwordHash,isActive:true}}); console.log(`Administrator ready: ${user.email}`); }
main().finally(async()=>{await prisma.$disconnect()});
