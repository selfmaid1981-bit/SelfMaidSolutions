const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

async function crmFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-api-key": ADMIN_KEY,
      ...(options?.headers || {}),
    },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export const crmApi = {
  getStats: () => crmFetch<any>("/api/crm/stats"),
  getLeads: () => crmFetch<any[]>("/api/crm/leads"),
  getLead: (id: string) => crmFetch<any>(`/api/crm/leads/${id}`),
  createLead: (data: any) => crmFetch<any>("/api/crm/leads", { method: "POST", body: JSON.stringify(data) }),
  updateLead: (id: string, data: any) => crmFetch<any>(`/api/crm/leads/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteLead: (id: string) => crmFetch<any>(`/api/crm/leads/${id}`, { method: "DELETE" }),
  convertLead: (id: string) => crmFetch<any>(`/api/crm/leads/${id}/convert`, { method: "POST" }),
  getClients: () => crmFetch<any[]>("/api/crm/clients"),
  getClient: (id: string) => crmFetch<any>(`/api/crm/clients/${id}`),
  createClient: (data: any) => crmFetch<any>("/api/crm/clients", { method: "POST", body: JSON.stringify(data) }),
  updateClient: (id: string, data: any) => crmFetch<any>(`/api/crm/clients/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  getAppointments: () => crmFetch<any[]>("/api/crm/appointments"),
  createAppointment: (data: any) => crmFetch<any>("/api/crm/appointments", { method: "POST", body: JSON.stringify(data) }),
  updateAppointment: (id: string, data: any) => crmFetch<any>(`/api/crm/appointments/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  getJobs: () => crmFetch<any[]>("/api/crm/jobs"),
  createJob: (data: any) => crmFetch<any>("/api/crm/jobs", { method: "POST", body: JSON.stringify(data) }),
  updateJob: (id: string, data: any) => crmFetch<any>(`/api/crm/jobs/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};
