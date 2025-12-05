import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface TransactionForm {
    amount: number;
    description: string;
}

export default function TransactionDemo() {
    const [form, setForm] = useState<TransactionForm>({
        amount: 0,
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data?.message || "Transaction failed");
            } else {
                setMessage("Transaction completed successfully!");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>
                Transaction Demo
            </h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                
                <label>
                    Amount:
                    <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px",
                        background: loading ? "#888" : "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Processing..." : "Submit Transaction"}
                </button>
            </form>

            {message && (
                <p style={{ color: "green", marginTop: "15px" }}>
                    {message}
                </p>
            )}

            {error && (
                <p style={{ color: "red", marginTop: "15px" }}>
                    {error}
                </p>
            )}
        </div>
    );
}
