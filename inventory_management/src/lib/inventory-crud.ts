import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(carId: string) {
  try {
    const { data, error } = await supabase
      .from("cars")
      .delete()
      .eq("id", carId);

    if (error) {
      throw new Error("Failed to delete Car");
    }
    revalidatePath("/dashboard/manage");
    return data;
  } catch (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to delete invoice" };
  } 
}