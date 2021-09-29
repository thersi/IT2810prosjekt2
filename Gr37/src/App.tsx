import React, { useContext } from "react";
import './App.css';
import Search from './components/Search'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import { ThemeCtx} from './ThemeProvider'
import { ToggleButton } from '@mui/material';


function App() {
  const { theme, toggleTheme } = useContext(ThemeCtx);
  let bar = true; /*implement means of setting the condition
  based on the input to the search component*/


  const renderCorrectChart = () => {
    if (bar) {
      return <BarChart
      xAxis={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
      yAxis={[12, 19, 3, 29, 2, 3]}
    />
    } else {
      return <LineChart
      dates={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
      merges={[12, 19, 3, 5, 2, 3]}
    />;
    }
  }

  return (
      <div className="App">

        <div className="wrapper">
          <header className="header">
            Repository data for group 37
          </header>
          <div className='search'>
          <Search></Search>
          </div>
          <div className="toggle">
            <ToggleButton id='toggleTheme' value="web" size="small" onClick={toggleTheme}>
              {theme === "light" ? "dark" : "light"} mode
            </ToggleButton>
          </div>
        <div className="displayChart">
          {renderCorrectChart()}
        </div>

        </div>
      </div>
  );
}

export default App;
