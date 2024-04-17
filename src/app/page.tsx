'use client';
import useAuthentication from "@/hooks/useAuthentication";
import Image from "next/image";

export default function Home() {
  useAuthentication();
  return (
    <main className="flex h-screen w-full items-center justify-center text-muted-foreground">
      <Image src="/images/logo.svg" alt="Logo" width={200} height={80} />
    </main>
  );
}
