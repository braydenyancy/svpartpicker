import React, { useState } from "react";
import InventoryList from "./components/Inventory";
import Search from "./components/Search";
import TotalPrice from "./components/TotalPrice";
import Stack from "./components/Stack"; // Import the new Stack component

import { ServiceList as serviceList } from "./assets/service-list";

const App = () => {
  const [services, setServices] = useState(serviceList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSearch = ({ searchTerm, filterFreeTier }) => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    const filtered = serviceList.filter((service) => {
      const matchesNameOrCategory =
        service.name.toLowerCase().includes(lowerCaseTerm) ||
        service.category.toLowerCase().includes(lowerCaseTerm);

      const matchesFreeTier = !filterFreeTier || service.hasFreeTier;

      return matchesNameOrCategory && matchesFreeTier;
    });

    setServices(filtered);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm)
  );

  const addToStack = (service) => {
    if (!selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices([...selectedServices, { ...service, usage: 1 }]);
    }
  };

  return (
    <div>
      <h1>Cloud Service Picker</h1>
      <Search onSearch={handleSearch} />
      <Stack
        selectedServices={selectedServices}
        updateSelectedServices={setSelectedServices}
      />
      {/* <TotalPrice
        selectedServices={selectedServices}
        updateSelectedServices={setSelectedServices}
      /> */}
      <InventoryList services={filteredServices} addToStack={addToStack} />
    </div>
  );
};

export default App;