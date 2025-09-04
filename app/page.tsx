import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="relative h-[340px] w-full overflow-hidden rounded-xl border">
        <Image src="/banner.png" alt="TitiFarm" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <Image src="/logo.png" alt="TitiFarm" width={200} height={60} />
            <p className="text-lg">Khu trải nghiệm làm nông nghiệp cho bé</p>
            <a href="/booking" className="inline-flex items-center justify-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium">Đặt lịch ngay</a>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border p-4">
          <p className="font-medium">Hoạt động phong phú</p>
          <p className="text-sm text-muted-foreground">Trồng rau, cho vật nuôi ăn, thu hoạch...</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="font-medium">Giá hợp lý</p>
          <p className="text-sm text-muted-foreground">Nhiều gói vé và combo gia đình.</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="font-medium">Dễ dàng đặt lịch</p>
          <p className="text-sm text-muted-foreground">Chọn ngày, số lượng và thanh toán nhanh.</p>
        </div>
      </section>
    </div>
  );
}
