import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FileText, Inbox, LogOut } from "lucide-react";
import { getToken, clearToken } from "./api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!getToken()) navigate("/", { replace: true });
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  const linkCls = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname.startsWith(path)
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Админ панель</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-border bg-card">
        <div className="container-wide flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Админ панель</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/posts" className={linkCls("/posts")}>
              <FileText className="w-4 h-4" /> Статьи
            </Link>
            <Link to="/leads" className={linkCls("/leads")}>
              <Inbox className="w-4 h-4" /> Заявки
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted"
              title="Выйти"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>
      <main className="container-wide px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
