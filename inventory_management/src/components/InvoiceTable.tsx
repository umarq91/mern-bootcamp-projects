import { fetchFilteredCars } from "@/lib/data";
import { toast } from "sonner";
import Cards, { Card } from "./card";

const InvoicesTableData = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { data, error } = await fetchFilteredCars(query, currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((car) => (
        <Card car={car} edit={true} />
      ))}
    </div>
  );
};

export default InvoicesTableData;
