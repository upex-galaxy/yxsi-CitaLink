import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "CitaLink", description: "Confirma tu cita con un link" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh text-gray-900">
        <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo-citalink.png" alt="CitaLink" width={40} height={40} className="rounded-full" />
              <span className="text-xl">CitaLink</span>
            </Link>
            <nav className="flex-grow flex justify-center gap-6 text-sm">
              <Link href="/dashboard" className="hover:text-gray-200 transition-colors">Dashboard</Link>
              <Link href="/appointments" className="hover:text-gray-200 transition-colors">CitaLinks</Link>
              <Link href="/settings" className="hover:text-gray-200 transition-colors">Ajustes</Link>
            </nav>
            <Link href="/login" className="ml-auto rounded-full bg-white px-4 py-2 text-emerald-700 font-medium shadow-md hover:bg-gray-100 transition-colors">Entrar</Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
