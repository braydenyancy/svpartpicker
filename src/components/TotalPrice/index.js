import React, { useState } from "react";

const TotalPrice = ({ selectedServices, updateSelectedServices }) => {
    // Handle removing a service
    const handleRemove = (index) => {
        const updatedServices = [...selectedServices];
        updatedServices.splice(index, 1);
        updateSelectedServices(updatedServices);
    };

    // Handle usage changes
    const handleUsageChange = (index, usage) => {
        const updatedServices = selectedServices.map((service, i) =>
            i === index ? { ...service, usage: parseFloat(usage) || 0 } : service
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
        <div className="Total-Price">
            <h2>Your Stack</h2>
            <ul>
                {selectedServices.map((service, index) => {
                    const exceedsFreeTier =
                        service.freeTier && service.usage > service.freeTierLimit;

                    return (
                        <li key={index} style={{ marginBottom: "15px" }}>
                            <div>
                                <strong>{service.name}</strong> - ${service.price}/unit
                                <br />
                                <span>Free Tier: {service.freeTier || "None"}</span>
                            </div>
                            <div>
                                <label>
                                    Usage:
                                    <input
                                        type="number"
                                        value={service.usage || 0}
                                        min="0"
                                        onChange={(e) =>
                                            handleUsageChange(index, e.target.value)
                                        }
                                    />
                                </label>
                                <button onClick={() => handleRemove(index)}>Remove</button>
                            </div>
                            {exceedsFreeTier && (
                                <div style={{ color: "red" }}>
                                    Exceeds free tier by {service.usage - service.freeTierLimit}{" "}
                                    units
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default TotalPrice;