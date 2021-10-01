import { useContext, useEffect, useState } from "react";
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
  const [getAllData, setAllData] = useState<any>([]);
  const fetchData = async () => {
    setData(await getEvents());
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    const c = sessionStorage.getItem("count");
    const dflt_c: number = JSON.parse(c !== null ? c : "0");
    setCount(dflt_c + 1);
    sessionStorage.setItem("count", JSON.stringify(dflt_c + 1));
    console.log("number of reloads: ", dflt_c + 1);
    fetchData();
  }, []);

  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = true; /*implement means of setting the condition
  based on the input to the search component*/

  if (getData === undefined || getData.length === 0) {
    return <div>Loading....</div>;
  }

  let mergeMembers = new Map();
  const commits = getData.forEach((element: any) => {
    let member = element.author_username;
    mergeMembers.has(member)
      ? mergeMembers.set(
          member,
          mergeMembers.get(member) + element.push_data.commit_count
        )
      : mergeMembers.set(member, 1);
  });

  let memberKeys: any = Array();
  let commitNumbers: any = Array();

  mergeMembers.forEach((value: any, key: string) => {
    memberKeys.push(key);
    commitNumbers.push(value);
  });

  const renderCorrectChart = () => {
    if (bar) {
      //HER MÅ DET VÆRE ANNEN LOGIKK, BASERT PÅ VALG I SEARCH
      return <BarChart xAxis={memberKeys} yAxis={commitNumbers} />;
    } else {
      //LINECHART SKAL HA ANDRE DATA, SE VARIABELNAVN
      return <LineChart dates={memberKeys} merges={commitNumbers} />;
    }
  };

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
