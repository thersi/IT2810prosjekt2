import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { ThemeCtx } from "./ThemeProvider";
import getEvents from "./Backend/api/GithubFetch";
import { displayPartsToString } from "typescript";

function App() {
  const [getData, setData] = useState<any>([]);

  const fetchData = async () => {
    setData(await getEvents());
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = false; /*implement means of setting the condition
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

  return (
    <div className="App">
      <button id="toggleTheme" onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
      <Search></Search>
      <div className="displayChart">{renderCorrectChart()}</div>
    </div>
  );
}

export default App;
