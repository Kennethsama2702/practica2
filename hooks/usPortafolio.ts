import { useState, useEffect } from "react";
import { portfolioApi, type PortfolioData } from "@/lib/api";

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const portfolioData = await portfolioApi.getAll();
      setData(portfolioData);
    } catch (err: any) {
      setError(err.message || "Error al cargar los datos del portafolio");
      console.error("Error loading portfolio data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refetch = () => {
    loadData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
}
