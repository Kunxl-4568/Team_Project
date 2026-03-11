import { Head } from '@inertiajs/react';

export default function dashboard() {
  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Product Inventory</h1>
        <p className="mt-4 text-gray-600">You can manage stock levels and product details here.</p>
      </div>
    </>
  );
}
