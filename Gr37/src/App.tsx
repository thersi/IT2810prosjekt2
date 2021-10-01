import { useContext, useEffect, useState } from "react";
import "./App.css";
import getEvents from "./Backend/api/GithubFetch";
import "./App.css";
import Search from "./components/Search";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { ThemeCtx } from "./ThemeProvider";
import { ToggleButton } from "@mui/material";
import { DateRange } from '@mui/lab';

function App() {
  const [getData, setData] = useState<any>([]);
  const fetchData = async () => {
    setData(await getEvents());
  };
  const d = localStorage.getItem("dates");
  const v = localStorage.getItem("value");
  const dflt_d = d !== null ? JSON.parse(d) : [null, null];
  const dflt_v = v !== null ? JSON.parse(v) : '';
  const [dates, setDates] = useState<DateRange<Date>>(dflt_d);
  const [value, setValue] = useState<string>(dflt_v);

  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('dates', JSON.stringify(dates));
    localStorage.setItem('value', JSON.stringify(value));
  }, [dates, value])

  useEffect(() => {
    const c = sessionStorage.getItem('count');
    const dflt_c: number = JSON.parse(c !== (null) ? c : "0");
    setCount(dflt_c + 1)
    sessionStorage.setItem('count', JSON.stringify(dflt_c + 1));
    console.log("number of reloads: ", dflt_c + 1);
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
    if (bar) { //HER MÅ DET VÆRE ANNEN LOGIKK, BASERT PÅ VALG I SEARCH
      return <BarChart xAxis={memberKeys} yAxis={commitNumbers} />;
    } else { //LINECHART SKAL HA ANDRE DATA, SE VARIABELNAVN
      return <LineChart dates={memberKeys} merges={commitNumbers} />;
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">Repository data for group 37</header>
        <div className="search">
          <Search value={value} setValue={setValue} dates={dates} setDates={setDates} />
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
