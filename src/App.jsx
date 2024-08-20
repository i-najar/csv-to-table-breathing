import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const apiURL = process.env.REACT_APP_CSV_URL;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log("FETCHED CSV TEXT:", text);

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            console.log("PARSE RESULTS:", results);
            const filteredData = results.data.filter((row) =>
              // if at least one value is not null/empty, row is displayed
              Object.values(row).some((value) => value !== null && value !== "")
            );
            console.log("FILTERED DATA:", filteredData);
            setData(filteredData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  console.log("RENDERED DATA:", data);

  return (
    <div className="App">
      <h1>Bazarr Breathing Products</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
