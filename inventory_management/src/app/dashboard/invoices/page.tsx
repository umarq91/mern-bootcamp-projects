import { supabase } from "@/supabase/client";
import InvoiceTable from "./InvoiceTable";
import CreateInvoiceModal from "./CreateInvoice";
import { log } from "node:console";

export default async function InvoicesPage() {
  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("*,car:car_id(*)");
    
    if (error) {
      console.error("Error fetching invoices:", error.message);
      return <div>Error fetching data</div>;
    }
    
    
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Invoices</h1>
      {/* Modal for adding new invoice */}
      <CreateInvoiceModal />


      {/* Invoice Table */}
      <InvoiceTable invoices={invoices || []} />

    </div>
  );
}
