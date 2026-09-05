import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell pub-dark">
      <div className="admin-topbar">
        <BrandMark className="admin-topbar-brand" href="/admin" />
        <nav className="admin-topbar-nav">
          <Link href="/admin">Sākums</Link>
          <Link href="/admin/menu">Ēdienkarte</Link>
          <Link href="/admin/preview">Priekšskatījums</Link>
        </nav>
        <div className="admin-topbar-actions">
          <LogoutButton />
        </div>
      </div>
      <div className="admin-main">{children}</div>
    </div>
  );
}
