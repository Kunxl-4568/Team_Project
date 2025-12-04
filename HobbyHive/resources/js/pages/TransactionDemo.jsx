import React, { useEffect, useState } from "react";

const API_BASE = "/api"; // use relative path so Laravel/Vite handles it

export default function TransactionDemo() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error("Can't load products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  function addToCart(p) {
    setInfo(null); setError(null);
    setCart(prev => {
      const exists = prev.find(x => x.product_id === p.id);
      if (exists) {
        return prev.map(x => x.product_id === p.id ? { ...x, quantity: Math.min(x.quantity+1, p.stock) } : x);
      }
      return [...prev, { product_id: p.id, name: p.name, quantity: 1, stock: p.stock }];
    });
  }

  function changeQty(id, v) {
    const qty = Math.max(0, Math.floor(Number(v) || 0));
    setCart(prev => prev.map(x => x.product_id===id ? { ...x, quantity: Math.min(qty, x.stock) } : x).filter(x=>x.quantity>0));
  }

  function removeItem(id) { setCart(prev => prev.filter(x => x.product_id !== id)); }

  async function submitForm(e) {
    e.preventDefault();
    setInfo(null); setError(null);
    if (cart.length === 0) { setError("Cart is empty"); return; }
    if (!address.trim()) { setError("Enter shipping address"); return; }

    const payload = { items: cart.map(c => ({ product_id: c.product_id, quantity: c.quantity })), shipping_address: address.trim() };

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(()=>({}));

      if (!res.ok || json.success === false) {
        if (json && json.errors && json.errors.items) setError(json.errors.items.join(" "));
        else setError(json.message || `Request failed (${res.status})`);
        return;
      }

      setInfo((json && json.message) ? `${json.message} (Order ID: ${json.data?.order_id ?? "-"})` : "Order placed");
      setCart([]); setAddress("");
      await fetchProducts();
    } catch (e) { setError(e.message || "Network error"); }
    setSubmitting(false);
  }

  return (
    <div style={{ padding:20, fontFamily:"system-ui, Arial" }}>
      <div style={{ maxWidth:900, margin:"0 auto", background:"#fff", padding:18, borderRadius:8 }}>
        <h2>Transaction demo</h2>
        <p style={{ color:"#555" }}>Add items and submit — this will POST to <code>/api/transactions</code>.</p>

        <div>
          <h4>Products</h4>
          {loading ? <div>Loading…</div> : products.length===0 ? <div>No products found</div> :
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
              {products.map(p => (
                <div key={p.id} style={{ border:"1px solid #eee", padding:10, borderRadius:8, display:"flex", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontWeight:700 }}>{p.name}</div>
                    <div style={{ color:"#666" }}>Stock: {p.stock}</div>
                  </div>
                  <button onClick={()=>addToCart(p)} disabled={p.stock<=0} style={{ padding:"6px 10px" }}>
                    {p.stock<=0 ? "Out" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          }
        </div>

        <form onSubmit={submitForm} style={{ marginTop:18 }}>
          <h4>Cart</h4>
          {cart.length===0 ? <div>Cart is empty</div> :
            cart.map(c => (
              <div key={c.product_id} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700 }}>{c.name}</div>
                  <div style={{ color:"#666" }}>Available: {c.stock}</div>
                </div>
                <input type="number" value={c.quantity} min="1" max={c.stock} onChange={(e)=>changeQty(c.product_id,e.target.value)} style={{ width:80, padding:6 }} />
                <button type="button" onClick={()=>removeItem(c.product_id)}>Remove</button>
              </div>
            ))
          }

          <div style={{ marginTop:12 }}>
            <label>Shipping address</label>
            <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="123 Example Street, Birmingham B1 1AA" style={{ width:"100%", padding:8, marginTop:6 }} />
          </div>

          <div style={{ marginTop:12 }}>
            <button type="submit" disabled={submitting} style={{ padding:"8px 12px" }}>{submitting ? "Processing..." : "Complete Transaction"}</button>
          </div>

          {info && <div style={{ marginTop:12, background:"#ecfdf5", padding:8 }}>{info}</div>}
          {error && <div style={{ marginTop:12, background:"#fff1f2", padding:8 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
