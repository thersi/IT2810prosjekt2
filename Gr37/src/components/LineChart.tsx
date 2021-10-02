import React from 'react'
import { Line } from 'react-chartjs-2'

/* 
Component ment to show number of merges over a timeperiod
*/
interface Props  {
   xAxis: string[];
   yAxis: number[];
  };

/* setState in parent, passes its states as props to this element. Takes two arrays, 
namely an array og dates and an array og "number of commits" for the respective dates*/

export default class LineChart extends React.Component <Props> {
/* The component takes two arrays as input."
Dates are displayed at the x-axis, and number of merges pr day at the y-axis.
Lists of colores for the different x-axis elements in the diagram are provided */

    state = {
        x: this.props.xAxis,
        y: this.props.yAxis
      };

    data = {
        labels: this.state.x,
        datasets: [{
            label: 'Merges',
            data: this.state.y,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }]
    }
    // Visual options
    options = {
        maintainAspectRatio: false,

        plugins: {
            title:{
                display: true, 
                text: "Merges pr day",
                padding: {
                    top: 20,
                    bottom: 25
                },
                font: {
                    size:20
                },
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Merges',
                    padding: {
                        top: 5,
                        bottom: 5
                    },
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    padding: {
                        top: 5,
                        bottom: 25
                    },
                }
            }
        }
    }

    render() {
        return <Line data={this.data} options={this.options}></Line>
    }
    
}