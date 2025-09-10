import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_DATA_URL}`);

        if (response.status === 200) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, loading }}>
      {children}
    </DataContext.Provider>
  );
}
