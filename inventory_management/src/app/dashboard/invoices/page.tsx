import { supabase } from "@/supabase/client";
import InvoiceClient from "./InvoiceClient";

export const revalidate = 60; // Optional: Adjust this based on your requirements

export default async function Page() {
  const { data: soldCars, error } = await supabase
    .from("cars")
    .select("name, sellPrice, soldon")
    .eq("status", "sold");

  if (error) {
    console.error("Error fetching sold cars:", error.message);
    return <div>Error fetching data</div>;
  }

  const total = soldCars?.reduce((acc, car) => acc + (car.sellPrice || 0), 0) || 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Sold Cars Invoice</h1>
      <InvoiceClient soldCars={soldCars || []} total={total} />
    </div>
  );
}
