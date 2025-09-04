export default function ActivitiesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Hoạt động</h1>
      <p className="text-sm text-muted-foreground max-w-2xl">
        Các hoạt động trải nghiệm nông nghiệp dành cho bé: trồng rau, cho dê ăn,
        thu hoạch trứng, làm gốm, và nhiều hơn nữa.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Trồng rau", "Cho dê ăn", "Thu hoạch trứng"].map((name) => (
          <div key={name} className="rounded-lg border p-4">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">
              Mô tả ngắn gọn về hoạt động {name.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


