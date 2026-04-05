"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !password) {
    redirect("/registracija?err=missing");
  }
  if (password.length < 8) {
    redirect("/registracija?err=password");
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    redirect("/registracija?err=exists");
  }

  try {
    await prisma.user.create({
      data: {
        email,
        passwordHash: await hash(password, 12),
        name: name.length > 0 ? name : null,
      },
    });
  } catch {
    redirect("/registracija?err=db");
  }

  redirect("/prijava?registered=1");
}
