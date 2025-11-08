import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "CitaLink", description: "Confirma tu cita con un link" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            <Image src="/logo-citalink.png" alt="CitaLink" width={28} height={28} />
            <Link href="/" className="font-semibold">CitaLink</Link>
            <nav className="ml-auto flex gap-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/appointments">CitaLinks</Link>
              <Link href="/settings">Ajustes</Link>
              <Link href="/login" className="rounded bg-emerald-500 px-3 py-1 text-white">Entrar</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
