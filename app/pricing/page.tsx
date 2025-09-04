export default function PricingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Bảng giá</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Vé bé", price: "150.000đ" },
          { name: "Vé người lớn", price: "80.000đ" },
          { name: "Combo gia đình", price: "450.000đ" },
        ].map((pkg) => (
          <div key={pkg.name} className="rounded-lg border p-4">
            <h3 className="font-medium">{pkg.name}</h3>
            <p className="text-2xl font-semibold">{pkg.price}</p>
            <p className="text-sm text-muted-foreground">Giá tham khảo (MVP).</p>
          </div>
        ))}
      </div>
    </section>
  );
}


