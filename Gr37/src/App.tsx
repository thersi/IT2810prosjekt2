import React from 'react';
import './App.css';
import Search from './components/Search'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'


function App() {
  return (
    <div className="App">
      <Search/>
      <LineChart
        dates={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
        merges={[12, 19, 3, 5, 2, 3]}
      />
      <BarChart
        xAxis={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
        yAxis={[12, 19, 3, 5, 2, 3]}
      />
    </div>
  );
}

export default App;
