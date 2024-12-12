import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterFreeTier, setFilterFreeTier] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch({ searchTerm: value, filterFreeTier });
    };

    const handleFreeTierToggle = () => {
        const newValue = !filterFreeTier;
        setFilterFreeTier(newValue);
        onSearch({ searchTerm, filterFreeTier: newValue });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    marginRight: "1rem",
                }}
            />
            <label style={{ cursor: "pointer" }}>
                <input
                    type="checkbox"
                    checked={filterFreeTier}
                    onChange={handleFreeTierToggle}
                    style={{ marginRight: "0.5rem" }}
                />
                Free Tier Only
            </label>
        </div>
    );
};

export default Search;