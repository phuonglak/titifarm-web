import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const packages = [
    {
      name: "Vé bé",
      description: "Dành cho trẻ em (bao gồm hoạt động cơ bản)",
      priceVnd: 150000,
    },
    {
      name: "Vé người lớn",
      description: "Người lớn đi kèm",
      priceVnd: 80000,
    },
    {
      name: "Combo gia đình",
      description: "2 người lớn + 2 trẻ em",
      priceVnd: 450000,
    },
  ];

  for (const p of packages) {
    await prisma.ticketPackage.upsert({
      where: { name: p.name },
      update: p,
      create: p,
    });
  }

  console.log("Seeded ticket packages");

  // Create admin user if not exists
  const adminEmail = process.env.ADMIN_EMAIL || "admin@titifarm.local";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(adminPass, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hash,
      role: "ADMIN",
    },
  });
  console.log("Seeded admin user:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


