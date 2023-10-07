import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:9000";
function CityProvider({ children }) {
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCity(data);
      } catch {
        alert("Error Occured");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCities(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error Occured");
    } finally {
      setIsLoading(false);
    }
  }
  async function createCities(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCity((city) => [...city, data]);
    } catch {
      alert("Error Occured");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCities(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setCity((city) => city.filter((city) => city.id !== id));
    } catch {
      alert("Error Occured");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        city,
        isLoading,
        currentCity,
        getCities,
        createCities,
        deleteCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext used outside the CitiesProvider");
  return context;
}

export { CityProvider, useCities };
