import React from "react";

const Stack = ({ selectedServices, updateSelectedServices }) => {
    const groupByArchitecture = (services) =>
        services.reduce((groups, service) => {
            const { architecture } = service;
            if (!groups[architecture]) {
                groups[architecture] = [];
            }
            groups[architecture].push(service);
            return groups;
        }, {});

    const groupedServices = groupByArchitecture(selectedServices);

    // Handle removing a service
    const handleRemove = (serviceId) => {
        const updatedServices = selectedServices.filter((s) => s.id !== serviceId);
        updateSelectedServices(updatedServices);
    };

    // Handle usage changes
    const handleUsageChange = (serviceId, usage) => {
        const updatedServices = selectedServices.map((service) =>
            service.id === serviceId
                ? { ...service, usage: parseFloat(usage) || 0 }
                : service
        );
        updateSelectedServices(updatedServices);
    };

    // Calculate total price
    const total = selectedServices.reduce((sum, service) => {
        const exceedsFreeTier =
            service.freeTier && service.usage > service.freeTierLimit;
        const applicableCost = exceedsFreeTier
            ? (service.usage - service.freeTierLimit) * service.price
            : 0;
        return sum + applicableCost;
    }, 0);

    return (
        <div className="Stack" style={{ marginTop: "2rem" }}>
            <h2>Your Stack</h2>
            {Object.keys(groupedServices).length === 0 ? (
                <p>No services added yet.</p>
            ) : (
                Object.keys(groupedServices).map((category) => (
                    <div key={category} style={{ marginBottom: "1rem" }}>
                        <h3>{category}</h3>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1rem",
                            }}
                        >
                            {groupedServices[category].map((service, index) => {
                                const exceedsFreeTier =
                                    service.freeTier && service.usage > service.freeTierLimit;

                                return (
                                    <div
                                        key={service.id}
                                        style={{
                                            background: "#f9f9f9",
                                            border: "1px solid #ddd",
                                            borderRadius: "5px",
                                            padding: "1rem",
                                        }}
                                    >
                                        <div>
                                            <strong>{service.name}</strong> - ${service.price}/unit
                                            <br />
                                            <span>
                                                Free Tier: {service.freeTier || "None"}
                                                {service.freeTier &&
                                                    ` (Limit: ${service.freeTierLimit} units)`}
                                            </span>
                                        </div>
                                        <div style={{ marginTop: "0.5rem" }}>
                                            <label>
                                                Usage:{" "}
                                                <input
                                                    type="number"
                                                    value={service.usage || 0}
                                                    min="0"
                                                    onChange={(e) =>
                                                        handleUsageChange(service.id, e.target.value)
                                                    }
                                                />
                                            </label>
                                            <button
                                                onClick={() => handleRemove(service.id)}
                                                style={{
                                                    marginLeft: "10px",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "3px",
                                                    padding: "0.25rem 0.5rem",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        {exceedsFreeTier && (
                                            <div style={{ color: "red", marginTop: "0.5rem" }}>
                                                Exceeds free tier by{" "}
                                                {service.usage - service.freeTierLimit} units
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
            <h3 style={{ marginTop: "2rem" }}>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default Stack;