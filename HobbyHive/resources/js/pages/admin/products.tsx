import AdminLayout from "../../layouts/Admin/AdminLayout";

import { Head, Link } from '@inertiajs/react';

type Product = {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  category: string;
  stock_quantity: number;
  stock_status: string;
};

type Props = {
  products: Product[];
};

export default function Products({ products = [] }: Props) {
  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'bg-green-100 text-green-700';
      case 'low stock':
        return 'bg-orange-100 text-orange-700';
      case 'out of stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return '£0.00';
    return `£${Number(price).toFixed(2)}`;
  };

  return (
    <AdminLayout title="Products">
      <Head title="Inventory" />

      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-black">Inventory Management</h1>

            <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow hover:bg-purple-700">
              + Add Product
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 text-left text-sm uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.product_id} className="hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                          <p className="mt-1 max-w-md truncate text-base text-gray-500">
                            {product.description ?? 'No description available'}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-base text-gray-500">
                        {product.category}
                      </td>

                      <td className="px-6 py-5 text-base font-semibold text-gray-700">
                        {formatPrice(product.sale_price ?? product.price)}
                      </td>

                      <td className="px-6 py-5 text-base font-semibold text-gray-700">
                        {product.stock_quantity} units
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                            product.stock_status
                          )}`}
                        >
                          {product.stock_status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4 text-sm font-semibold">
                          <button className="text-blue-600 hover:underline">Edit</button>
                          <button className="text-red-500 hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}