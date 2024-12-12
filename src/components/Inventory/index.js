import React from "react";
import "./index.css";

const InventoryList = ({ services, addToStack }) => {
    // Separate services into free and paid
    const freeServices = services.filter((service) => service.hasFreeTier);
    const paidServices = services.filter((service) => !service.hasFreeTier);

    return (
        <div className="Available-Inventory" style={{ display: "flex", gap: "2rem" }}>
            {/* Free Tier Services */}
            <div style={{ flex: 1 }}>
                <h3 style={{ color: "green", textAlign: "center" }}>Free Tier Services</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {freeServices.map((service) => (
                        <div
                            key={service.id}
                            style={{
                                background: "#e6ffe6",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                padding: "1rem",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>{service.name}</p>
                            <p>Category: {service.category}</p>
                            <p>Limit: {service.freeTier}</p>
                            <button
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => addToStack(service)}
                            >
                                Add to Stack
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Paid Services */}
            <div style={{ flex: 1 }}>
                <h3 style={{ color: "red", textAlign: "center" }}>Paid Services</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {paidServices.map((service) => (
                        <div
                            key={service.id}
                            style={{
                                background: "#ffe6e6",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                padding: "1rem",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>{service.name}</p>
                            <p>Category: {service.category}</p>
                            <p>${service.price}/month</p>
                            <button
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => addToStack(service)}
                            >
                                Add to Stack
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventoryList;