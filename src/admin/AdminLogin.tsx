import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { api, setToken, getToken } from "./api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) navigate("/posts", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      navigate("/posts");
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet>
        <title>Вход — Leader Audit</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-lg"
      >
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-foreground text-center mb-6">Вход в админку</h1>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-cta py-3 rounded-xl font-semibold text-cta-foreground disabled:opacity-70"
          >
            {loading ? "Входим…" : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
