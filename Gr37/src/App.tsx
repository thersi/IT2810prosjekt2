import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import getEvents from "./Backend/api/GithubFetch";
import "./App.css";
import Search from "./components/Search";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { ThemeCtx } from "./ThemeProvider";
import { ToggleButton } from "@mui/material";

function App() {
  const [getData, setData] = useState<any>([]);
  const fetchData = async () => {
    setData(await getEvents());
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = true; /*implement means of setting the condition
  based on the input to the search component*/
  console.log(getData);
  if (getData === undefined || getData.length === 0) {
    return <div>Loading....</div>;
  }
  console.log(getData);
  let mergeMembers = new Map();
  const commits = getData
    .filter((data: any) => data.action_name === "pushed to")
    .forEach((element: any) => {
      let member = element.author_username;
      mergeMembers.has(member)
        ? mergeMembers.set(member, mergeMembers.get(member) + 1)
        : mergeMembers.set(member, 1);
    });

  let memberKeys: any = Array();
  let commitNumbers: any = Array();

  mergeMembers.forEach((value: any, key: string) => {
    memberKeys.push(key);
    commitNumbers.push(value);
  });

  console.log(memberKeys);
  console.log(commitNumbers);

  const renderCorrectChart = () => {
    if (bar) {
      return <BarChart xAxis={memberKeys} yAxis={commitNumbers} />;
    } else {
      return <LineChart dates={memberKeys} merges={commitNumbers} />;
    }
  };

  const c = sessionStorage.getItem('count');
  const dflt_c = JSON.parse(c !== null ? c : "0");
  const count = dflt_c;

  window.onload = e => {
    var n = count+1;
    sessionStorage.setItem('count', JSON.stringify(n));
    console.log("number of reloads: ", n);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">Repository data for group 37</header>
        <div className="search">
          <Search></Search>
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
