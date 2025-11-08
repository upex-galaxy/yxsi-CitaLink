import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
      <div className="container flex max-w-5xl flex-col items-center justify-center gap-8 px-4 text-center md:px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo-citalink.png"
            alt="CitaLink Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            CitaLink
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Confirma tu cita con un link.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Link
            href="/appointments/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Crear Cita
          </Link>
          <Link
            href="/appointments"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Ver Citas
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold">Confirmación por Link</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Envía un link único a tus pacientes para que confirmen su asistencia fácilmente.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold">Anticipo Configurable</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Define un anticipo para asegurar la cita y reducir las ausencias.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold">Política de Cancelación Clara</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Establece y comunica tus políticas de cancelación de forma transparente.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
