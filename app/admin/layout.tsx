export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <div className="flex gap-4 text-sm">
        <a href="/admin/bookings" className="underline">Bookings</a>
        <a href="/admin/packages" className="underline">Ticket Packages</a>
      </div>
      {children}
    </section>
  );
}


