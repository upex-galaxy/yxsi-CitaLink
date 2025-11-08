export default function Dashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-semibold">Resumen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">Ingresos por anticipos (demo)</div>
          <div className="text-2xl font-bold">€ 0</div>
        </div>
      </div>
    </div>
  );
}
