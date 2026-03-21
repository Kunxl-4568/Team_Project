import { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";

type ReturnStatus = "None" | "Requested Return" | "Returned";
type OrderStatus = "Processing" | "Delivered" | "In Transit" | "Requested Return" | "Returned";

type OrderItem = {
  id: number;
  product_id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  return_status?: ReturnStatus;
};

type Order = {
  id: number;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
};

type Props = {
  orders: Order[];
};

export default function PreviousOrders({ orders: initialOrders }: Props) {
  const [orders, setOrders] = useState(initialOrders);

  const fixedRef = useRef<HTMLDivElement>(null);
  const [fixedHeight, setFixedHeight] = useState(0);
  const [bannerVisible] = useState(true);

  const basket: any[] = []; 
  useEffect(() => {
    if (fixedRef.current) {
      setFixedHeight(fixedRef.current.offsetHeight);
    }
  }, []);

  const requestReturn = (orderId: number, itemId: number) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.id === itemId
                  ? { ...item, return_status: "Requested Return" }
                  : item
              ),
            }
          : order
      )
    );
  };

  const statusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      Processing: "bg-yellow-100 text-yellow-800",
      Delivered: "bg-green-100 text-green-800",
      "In Transit": "bg-blue-100 text-blue-800",
      "Requested Return": "bg-orange-100 text-orange-800",
      Returned: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
        <div className="w-full flex justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12">
            <Header basket={basket} />
          </div>
        </div>

        <div className="flex justify-center w-full mt-1">
          <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
            <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
          </div>
        </div>
      </div>


      <div className="pt-[140px] space-y-6 bg-[#fff8dc] min-h-screen p-4 mt-15">

        <div className="px-4 md:px-8 lg:px-12 space-y-1">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-slab text-black md:text-3xl">
                    My Orders
                    </h1>
                    
                    <img src="/images/Bee doodle no background.png" alt="Bee doodle" 
                    className="h-12 md:h-16 lg:h-20 ml-4"
                    />
            </div>
            
            <Link 
                href="dashboard"
                className="text-[#2c2c2c] font-semibold text-sm underline"
            >
                Back
            </Link>
        </div>


        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold text-[#2c2c2c]">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  Purchased: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                {statusBadge(order.status)}
                <p className="font-semibold text-[#2c2c2c] mt-1">
                  Total: £{order.total.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-2">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="min-w-[160px] flex-shrink-0 border rounded-lg p-3 text-center bg-gray-50"
                >
                  <Link href={`/products/${item.product_id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-contain mx-auto"
                    />
                  </Link>

                  <p className="font-semibold text-[#2c2c2c] mt-2 truncate">
                    {item.title}
                  </p>
                  <p className="text-[#2c2c2c]">£{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>

                  <div className="mt-2">
                    {item.return_status === "Requested Return" ? (
                      <span className="text-yellow-600 text-sm">Return requested</span>
                    ) : item.return_status === "Returned" ? (
                      <span className="text-green-600 text-sm">Returned</span>
                    ) : (
                      <button
                        onClick={() => requestReturn(order.id, item.id)}
                        className="text-sm text-red-500 underline"
                      >
                        Request return
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}