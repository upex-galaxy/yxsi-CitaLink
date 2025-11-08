export default function Page() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-bold">Confirma tu cita con un link</h1>
      <p className="max-w-prose">Reduce no-shows con anticipos sencillos por link. Crea CitaLinks y envíalos por WhatsApp o email.</p>
      <div className="flex gap-3">
        <a href="/register" className="rounded bg-emerald-600 px-4 py-2 text-white">Probar gratis</a>
        <a href="/dashboard" className="rounded border px-4 py-2">Ver demo</a>
      </div>
    </section>
  );
}
