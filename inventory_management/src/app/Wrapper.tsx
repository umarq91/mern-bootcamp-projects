'use client'
// components/CarsWrapper.tsx
import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { supabase } from "@/supabase/client";
import { CarData } from "@/Types";
import { carAtom, carsErrorAtom } from "@/store";


const CarsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setCars = useSetAtom(carAtom);
  const setError = useSetAtom(carsErrorAtom);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        setError(error.message);
        setCars([]); // Clear cars on error
      } else {
        setError(null);
        setCars(data as any); // Ensure no null values
      }
    };

    fetchCars();
  }, [setCars, setError]);

  return <>{children}</>;
};

export default CarsWrapper;
