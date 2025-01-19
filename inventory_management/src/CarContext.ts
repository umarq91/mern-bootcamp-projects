"use client"
// contexts/CarsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { CarData } from "./Types";

export interface CarsContextType {
  cars: CarData[];
  error: string | null;
}

// Create context with undefined as the default value
export const CarsContext = createContext<CarsContextType | undefined>(undefined);

// Create provider component
export const CarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        setError(error.message);
      } else {
        setCars(data || []);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarsContext.Provider value={{ cars, error }}>
      {children}
    </CarsContext.Provider>
  );
};

// Custom hook to use CarsContext
export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("useCars must be used within a CarsProvider");
  }
  return context;
};

