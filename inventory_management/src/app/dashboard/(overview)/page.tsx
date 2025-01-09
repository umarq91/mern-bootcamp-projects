import React from "react";
import { supabase } from "@/supabase/client";
import Cards from "@/components/card";
import CarsData from "./CarsData";

const Home = async () => {
  return (
    <div className="container mx-auto p-4">
      <CarsData />
    </div>
  );
};

export default Home;
