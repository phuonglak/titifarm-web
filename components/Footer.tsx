export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} TitiFarm. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/terms" className="hover:underline">
            Điều khoản
          </a>
          <a href="/privacy" className="hover:underline">
            Bảo mật
          </a>
        </div>
      </div>
    </footer>
  );
}


