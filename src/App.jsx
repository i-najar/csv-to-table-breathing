import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import sampleCSV from "../public/sampleinventory.csv";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(sampleCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  return (
    <div className="App">
      <h1>Sample Inventory CSV</h1>
    </div>
  );
}

export default App;
