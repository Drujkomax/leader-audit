import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle } from "lucide-react";
import { api } from "./api";

const LeadsList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-leads"], queryFn: api.leads, retry: false });

  if (error && (error as Error).message === "unauthorized") {
    navigate("/");
    return null;
  }

  const toggle = async (id: number, status: "new" | "processed") => {
    await api.setLeadStatus(id, status === "new" ? "processed" : "new");
    queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Заявки</h1>
      {isLoading && <p className="text-muted-foreground">Загрузка…</p>}
      {data?.length === 0 && <p className="text-muted-foreground">Заявок пока нет.</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="py-2 pr-4 font-medium">Дата</th>
              <th className="py-2 pr-4 font-medium">Имя</th>
              <th className="py-2 pr-4 font-medium">Телефон</th>
              <th className="py-2 pr-4 font-medium">Компания</th>
              <th className="py-2 pr-4 font-medium">Страница</th>
              <th className="py-2 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((lead) => (
              <tr key={lead.id} className={`border-b border-border ${lead.status === "processed" ? "opacity-50" : ""}`}>
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                  {lead.created_at.replace("T", " ").slice(0, 16)}
                </td>
                <td className="py-3 pr-4 font-medium text-foreground">{lead.name}</td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {lead.phone}
                  </a>
                </td>
                <td className="py-3 pr-4">{lead.company}</td>
                <td className="py-3 pr-4 text-muted-foreground">{lead.page}</td>
                <td className="py-3 w-32">
                  <button
                    onClick={() => toggle(lead.id, lead.status)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsList;
