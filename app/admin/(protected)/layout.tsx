import Link from "next/link";
import "../admin.css";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-brand">Go To Sushi Bar · Administrēšana</span>
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
