import AdminLayout from "../../layouts/Admin/AdminLayout";
import { Head } from '@inertiajs/react';

type Product = {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  category: string;
  stock_quantity: number;
  low_stock_threshold: number;
  stock_status: string;
};

type AlertItem = {
  product_id: number;
  name: string;
  stock_status: 'low_stock' | 'out_of_stock' | string;
  message: string;
};

type Props = {
  products?: {
    data: Product[];
  };
  alerts?: AlertItem[];
};

export default function Dashboard({ products, alerts }: Props) {
  const inventoryProducts = products?.data ?? [];
  const inventoryAlerts = alerts ?? [];

  return (
    <AdminLayout title="Product Inventory">
      <Head title="Admin Dashboard" />
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold">Product Inventory</h1>
            <p className="mt-2 text-gray-500">You can manage stock levels and product details here.</p>
          </div>
          <div className="flex items-center justify-end">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              + Add Product
            </button>
          </div>
        </div>

        {/* {inventoryAlerts.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">Inventory Alerts</p>
                <p className="text-xs text-amber-700">Some products need attention:</p>
              </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-amber-800">
              {inventoryAlerts.map((alert) => (
                <li key={alert.product_id}>
                  <span className="font-medium">{alert.name}</span>: {alert.stock_status === 'out_of_stock' ? 'Out of stock' : 'Low stock'}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {inventoryProducts.map((product) => {
                const price =
                  product.sale_price && product.sale_price < product.price
                    ? product.sale_price
                    : product.price;

                return (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.category || 'Uncategorized'}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700">£{price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.stock_quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.stock_status}</td>
                    <td className="px-4 py-3 text-sm text-right space-x-2">
                      <button className="rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700">Edit</button>
                      <button className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}