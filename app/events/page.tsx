export default function EventsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Sự kiện</h1>
      <ul className="space-y-4">
        {[
          { date: "2025-09-15", name: "Lễ hội thu hoạch" },
          { date: "2025-10-01", name: "Ngày trải nghiệm gia đình" },
        ].map((ev) => (
          <li key={ev.name} className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{ev.date}</p>
            <p className="font-medium">{ev.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}


