import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "./App.css";
import Search from "./components/Search";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { ThemeCtx } from "./ThemeProvider";
import { ToggleButton } from "@mui/material";

function App() {
  const { theme, toggleTheme } = useContext(ThemeCtx);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [chart, setChart] = useState<number>(0);

  /* HTML session storage is used to count the number of times the website has been refreshed. This is done
  by a useEffect which increases the counter by one each time the website is refreshed. The value is then stored
  in the session storage as a JSON file. When needed, the value is collected from the JSON file and parsed back to 
  its orginal format. */
  useEffect(() => {
    const c = sessionStorage.getItem("count");
    const dflt_c: number = JSON.parse(c !== null ? c : "0");
    sessionStorage.setItem("count", JSON.stringify(dflt_c + 1));
  }, []);

  /**
   * Renders a BarChart if search action is commits, a LineChart if search-acion is merges, or nothing if 
   * a search has not been made yet.
   */
  const renderCorrectChart = () => {
    if (chart === 1) {
      console.log('BarChart: ', xAxis, yAxis)
      return <BarChart xAxis={xAxis} yAxis={yAxis} />;
    } else if (chart === 2) {
      console.log('lineChart: ', xAxis, yAxis)
      return <LineChart xAxis={xAxis} yAxis={yAxis} />;
    } else {
      return <p>please make a search</p>;
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">Repository data for group 37</header>
        <div className="search">
          <Search
            setYAxis={setYAxis}
            setXAxis={setXAxis}
            setChart={setChart}
          />
        </div>
        <div className="toggle">
          <ToggleButton
            id="toggleTheme"
            value="web"
            size="small"
            onClick={toggleTheme}
          >
            {theme === "light" ? "dark" : "light"} mode
          </ToggleButton>
        </div >
        <div className="displayChart">{renderCorrectChart()}</div>
      </div>
    </div>
  );
}

export default App;
