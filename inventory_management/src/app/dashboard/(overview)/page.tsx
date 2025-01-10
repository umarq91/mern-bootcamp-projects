import React from "react";
import { supabase } from "@/supabase/client";
import CarsData from "./CarsData";

const revalidate = 0;
const Home = async () => {
  const { data, error } = await supabase.from("cars").select("*");

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">
          Error loading data.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <CarsData data={data} />
    </div>
  );
};

export default Home;
