import React, { useContext, useState } from "react";
import './App.css';
import Search from './components/Search'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import { ThemeCtx} from './ThemeProvider'

function App() {
  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = false; /*implement means of setting the condition
  based on the input to the search component*/

  const renderCorrectChart = () => {
    if (bar) {
      return <BarChart
      xAxis={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
      yAxis={[12, 19, 3, 5, 2, 3]}
    />
    } else {
      return <LineChart
      dates={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
      merges={[12, 19, 3, 5, 2, 3]}
    />;
    }
  }

  const c = sessionStorage.getItem('count');
  const dflt_c = JSON.parse(c !== null ? c : "0");
  const [count] = useState<number>(dflt_c);

  window.onload = e => {
    var n = count+1;
    sessionStorage.setItem('count', JSON.stringify(n));
    console.log("number of reloads: ", n);
  }

  return (
      <div className="App">
        <button id= 'toggleTheme' onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
        <Search/>
        <div className="displayChart">
        {renderCorrectChart()}
        </div>
      </div>
  );
}

export default App;
