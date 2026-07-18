import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { api } from "./api";

// В базе created_at лежит в UTC (SQLite datetime('now')) и без пометки о
// зоне. Показываем ташкентское время — тем же форматом, что шлёт бот.
const formatCreatedAt = (raw: string) => {
  const utc = new Date(`${raw.replace(" ", "T")}Z`);
  if (Number.isNaN(utc.getTime())) return raw;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  }).format(utc);
};

const LeadsList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleted, setShowDeleted] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-leads", showDeleted],
    queryFn: () => api.leads(showDeleted),
    retry: false,
  });

  if (error && (error as Error).message === "unauthorized") {
    navigate("/");
    return null;
  }

  // Обе вкладки берут данные с сервера, поэтому обновляем список целиком.
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-leads"] });

  const toggle = async (id: number, status: "new" | "processed") => {
    await api.setLeadStatus(id, status === "new" ? "processed" : "new");
    refresh();
  };

  const remove = async (id: number, name: string) => {
    if (!window.confirm(`Удалить заявку от «${name}»? Её можно будет вернуть из вкладки «Удалённые».`)) return;
    try {
      await api.deleteLead(id);
      toast.success("Заявка удалена");
      refresh();
    } catch {
      toast.error("Не удалось удалить");
    }
  };

  const restore = async (id: number) => {
    try {
      await api.restoreLead(id);
      toast.success("Заявка восстановлена");
      refresh();
    } catch {
      toast.error("Не удалось восстановить");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Заявки</h1>
      <div className="flex gap-2 mb-4">
        {[
          { label: "Активные", deleted: false },
          { label: "Удалённые", deleted: true },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setShowDeleted(tab.deleted)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showDeleted === tab.deleted
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
      {data?.length === 0 && (
        <p className="text-muted-foreground">
          {showDeleted ? "Удалённых заявок нет." : "Заявок пока нет."}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="py-2 pr-4 font-medium">Дата</th>
              <th className="py-2 pr-4 font-medium">Имя</th>
              <th className="py-2 pr-4 font-medium">Телефон</th>
              <th className="py-2 pr-4 font-medium">Компания</th>
              <th className="py-2 pr-4 font-medium">Страница</th>
              <th className="py-2 pr-4 font-medium">Статус</th>
              <th className="py-2 font-medium sr-only">Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((lead) => (
              <tr key={lead.id} className={`border-b border-border ${lead.status === "processed" ? "opacity-50" : ""}`}>
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                  {formatCreatedAt(lead.created_at)}
                </td>
                <td className="py-3 pr-4 font-medium text-foreground">{lead.name}</td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {lead.phone}
                  </a>
                </td>
                <td className="py-3 pr-4">{lead.company}</td>
                <td className="py-3 pr-4 text-muted-foreground">{lead.page}</td>
                <td className="py-3 pr-4 w-32">
                  <button
                    onClick={() => toggle(lead.id, lead.status)}
                    disabled={showDeleted}
                    className="flex items-center gap-1.5 text-xs font-medium w-28 whitespace-nowrap"
                    title="Переключить статус"
                  >
                    {lead.status === "processed" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-green-700">Обработана</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-cta" />
                        <span className="text-foreground">Новая</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="py-3 w-10">
                  {showDeleted ? (
                    <button
                      onClick={() => restore(lead.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Восстановить заявку"
                      aria-label={`Восстановить заявку от ${lead.name}`}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => remove(lead.id, lead.name)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Удалить заявку"
                      aria-label={`Удалить заявку от ${lead.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsList;
