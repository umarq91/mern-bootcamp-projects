import { supabase } from "@/supabase/client";

const ITEMS_PER_PAGE = 3;

export async function fetchCarsPages(query: string) {
  try {
    const { count, error } = await supabase
      .from("cars")
      .select("*", { count: "exact", head: true }); // 'exact' returns the count of rows

    if (error) {
      console.error("Supabase Error1:", error);
      throw new Error("Failed to fetch total number of cars.");
    }

    // Calculate total pages based on the count of results
    const totalPages = Math.ceil(Number(count ?? 0) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Supabase Error1:", error);
    throw new Error("Failed to fetch total number of cars.");
  }
}

export async function fetchFilteredCars(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("year", { ascending: false })
      // .or(`name.contains.${query}`)
      .range(offset, offset + ITEMS_PER_PAGE - 1);
    console.log(data);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error };
  } catch (error) {
    throw new Error("Some fetching error here");
  }
}
