import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="TitiFarm" width={120} height={36} priority />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/activities" className="hover:underline">
            Hoạt động
          </Link>
          <Link href="/pricing" className="hover:underline">
            Bảng giá
          </Link>
          <Link href="/events" className="hover:underline">
            Sự kiện
          </Link>
          <Link href="/contact" className="hover:underline">
            Liên hệ
          </Link>
          <Link href="/booking" className="hover:underline font-medium">
            Đặt lịch
          </Link>
          <Link href="/account" className="hover:underline">
            Tài khoản
          </Link>
        </nav>
      </div>
    </header>
  );
}


