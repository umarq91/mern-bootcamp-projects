type Invoice = {
    id: number;
    car_name: string;
    buyer_name: string;
    sell_price: number;
    payment_status: string;
    invoice_date: string;
    car?:any
  };
  
  interface InvoiceTableProps {
    invoices: Invoice[];
  }
  
  const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
    console.log(invoices);
    
    return (
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Invoice ID</th>
            <th className="border border-gray-300 p-2">Car Name</th>
            <th className="border border-gray-300 p-2">Buyer</th>
            <th className="border border-gray-300 p-2">Sell Price</th>
            <th className="border border-gray-300 p-2">Payment Status</th>
            <th className="border border-gray-300 p-2">Invoice Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="border border-gray-300 p-2">{invoice.id}</td>
              <td className="border border-gray-300 p-2">{invoice.car.name}</td>
              <td className="border border-gray-300 p-2">{invoice.buyer_name}</td>
              <td className="border border-gray-300 p-2">PKR {invoice.sell_price}</td>
              <td className="border border-gray-300 p-2">{invoice.payment_status}</td>
              <td className="border border-gray-300 p-2">
                {new Date(invoice.invoice_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default InvoiceTable;
  