"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { log } from "node:console";
import { toast } from "sonner";

const CreateInvoiceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    car_id: null,
    buyer_name: "",
    buyer_contact: "",
    seller_name: "",
    seller_contact: "",
    invoice_date: new Date().toISOString().split("T")[0],
    purchase_price: 0.0,
    sell_price: 0.0,
    tax_amount: 0.0,
    discount: 0.0,
    total_amount: 0.0,
    payment_status: "Pending",
    payment_method: "Cash",
  });

  useEffect(() => {
    // Update total_amount whenever sell_price, tax_amount, or discount changes
    const totalAmount =
      formData.sell_price + formData.tax_amount - formData.discount;
    setFormData((prev) => ({
      ...prev,
      total_amount: totalAmount,
    }));
  }, [formData.sell_price, formData.tax_amount, formData.discount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("price") || name.includes("amount") || name === "car_id"
          ? parseFloat(value) || 0 // Convert numeric fields
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !formData.car_id ||
      !formData.buyer_name ||
      !formData.invoice_date ||
      !formData.sell_price
    ) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    // Insert data into Supabase
    try {
      console.log(formData);

      const { error } = await supabase.from("invoices").insert([formData]);
      if (error) throw error;

      alert("Invoice created successfully!");
      setFormData({
        car_id: null,
        buyer_name: "",
        buyer_contact: "",
        seller_name: "",
        seller_contact: "",
        invoice_date: new Date().toISOString().split("T")[0],
        purchase_price: 0.0,
        sell_price: 0.0,
        tax_amount: 0.0,
        discount: 0.0,
        total_amount: 0.0,
        payment_status: "Pending",
        payment_method: "Cash",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating invoice");
      toast.error("Error making an Invoice")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-gradient-to-r my-4 from-blue-500 to-blue-600 text-white py-3 px-7 rounded hover:from-blue-600 hover:to-blue-700 transition-all"
        onClick={() => setIsOpen(true)}
      >
        Add Invoice
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white h-[80vh] overflow-y-scroll p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create Invoice
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Car ID */}
              <div>
                <label
                  htmlFor="car_id"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Car ID *
                </label>
                <input
                  id="car_id"
                  type="number"
                  name="car_id"
                  placeholder="Enter Car ID"
                  value={formData.car_id || ""}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                  required
                />
              </div>
              {/* Buyer Name */}
              <div>
                <label
                  htmlFor="buyer_name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Buyer Name *
                </label>
                <input
                  id="buyer_name"
                  type="text"
                  name="buyer_name"
                  placeholder="Enter Buyer Name"
                  value={formData.buyer_name}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                  required
                />
              </div>
              {/* Buyer Contact */}
              <div>
                <label
                  htmlFor="buyer_contact"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Buyer Contact
                </label>
                <input
                  id="buyer_contact"
                  type="text"
                  name="buyer_contact"
                  placeholder="Enter Buyer Contact"
                  value={formData.buyer_contact}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Seller Name */}
              <div>
                <label
                  htmlFor="seller_name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Seller Name
                </label>
                <input
                  id="seller_name"
                  type="text"
                  name="seller_name"
                  placeholder="Enter Seller Name"
                  value={formData.seller_name}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Seller Contact */}
              <div>
                <label
                  htmlFor="seller_contact"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Seller Contact
                </label>
                <input
                  id="seller_contact"
                  type="text"
                  name="seller_contact"
                  placeholder="Enter Seller Contact"
                  value={formData.seller_contact}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Invoice Date */}
              <div>
                <label
                  htmlFor="invoice_date"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Invoice Date *
                </label>
                <input
                  id="invoice_date"
                  type="date"
                  name="invoice_date"
                  value={formData.invoice_date}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                  required
                />
              </div>
              {/* Purchase Price */}
              <div>
                <label
                  htmlFor="purchase_price"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Purchase Price
                </label>
                <input
                  id="purchase_price"
                  type="number"
                  name="purchase_price"
                  placeholder="Enter Purchase Price"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Sell Price */}
              <div>
                <label
                  htmlFor="sell_price"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Sell Price *
                </label>
                <input
                  id="sell_price"
                  type="number"
                  name="sell_price"
                  placeholder="Enter Sell Price"
                  value={formData.sell_price}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                  required
                />
              </div>
              {/* Tax Amount */}
              <div>
                <label
                  htmlFor="tax_amount"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Tax Amount
                </label>
                <input
                  id="tax_amount"
                  type="number"
                  name="tax_amount"
                  placeholder="Enter Tax Amount"
                  value={formData.tax_amount}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Discount */}
              <div>
                <label
                  htmlFor="discount"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  placeholder="Enter Discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Total Amount */}
              <div>
                <label
                  htmlFor="total_amount"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Total Amount
                </label>
                <input
                  id="total_amount"
                  type="number"
                  name="total_amount"
                  placeholder="Enter Total Amount"
                  value={formData.total_amount}
                  readOnly
                  className="border p-3 rounded w-full"
                />
              </div>
              {/* Payment Status */}
              <div>
                <label
                  htmlFor="payment_status"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Payment Status
                </label>
                <select
                  id="payment_status"
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              {/* Payment Method */}
              <div>
                <label
                  htmlFor="payment_method"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Payment Method
                </label>
                <select
                  id="payment_method"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateInvoiceModal;
