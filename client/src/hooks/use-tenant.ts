import { useState, useCallback } from "react";

interface TenantContext {
  companyId: string | null;
  companyName: string | null;
  tier: string | null;
  setTenant: (id: string, name: string, tier: string) => void;
  clearTenant: () => void;
}

export function useTenant(): TenantContext {
  const [companyId, setCompanyId] = useState<string | null>(
    () => localStorage.getItem("tenant_company_id")
  );
  const [companyName, setCompanyName] = useState<string | null>(
    () => localStorage.getItem("tenant_company_name")
  );
  const [tier, setTier] = useState<string | null>(
    () => localStorage.getItem("tenant_tier")
  );

  const setTenant = useCallback((id: string, name: string, t: string) => {
    setCompanyId(id);
    setCompanyName(name);
    setTier(t);
    localStorage.setItem("tenant_company_id", id);
    localStorage.setItem("tenant_company_name", name);
    localStorage.setItem("tenant_tier", t);
  }, []);

  const clearTenant = useCallback(() => {
    setCompanyId(null);
    setCompanyName(null);
    setTier(null);
    localStorage.removeItem("tenant_company_id");
    localStorage.removeItem("tenant_company_name");
    localStorage.removeItem("tenant_tier");
  }, []);

  return { companyId, companyName, tier, setTenant, clearTenant };
}
