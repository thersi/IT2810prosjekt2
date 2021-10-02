import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "./App.css";
import Search from "./components/Search";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { ThemeCtx } from "./ThemeProvider";
import { ToggleButton } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const c = sessionStorage.getItem("count");
    const dflt_c: number = JSON.parse(c !== null ? c : "0");
    setCount(dflt_c + 1);
    sessionStorage.setItem("count", JSON.stringify(dflt_c + 1));
    console.log("number of reloads: ", dflt_c + 1);
  }, []);

  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = true; /*implement means of setting the condition
  based on the input to the search component*/

  const [memberKeys, setMemberKeys] = useState<string[]>([]);
  const [commitNumbers, setCommitNumbers] = useState<number[]>([]);
  const [chart, setChart] = useState<number>(0);

  const renderCorrectChart = () => {
    if (chart === 1) {
      //HER MÅ DET VÆRE ANNEN LOGIKK, BASERT PÅ VALG I SEARCH
      return <BarChart xAxis={memberKeys} yAxis={commitNumbers} />;
    } else if (chart === 2) {
      //LINECHART SKAL HA ANDRE DATA, SE VARIABELNAVN
      return <LineChart dates={memberKeys} merges={commitNumbers} />;
    } else {
      return <p>no data</p>;
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">Repository data for group 37</header>
        <div className="search">
          <Search
            setCommitNumbers={setCommitNumbers}
            setMemberKeys={setMemberKeys}
            setChart={setChart}
          ></Search>
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
        </div>
        <div className="displayChart">{renderCorrectChart()}</div>
      </div>
    </div>
  );
}

export default App;
