import React from 'react'
import { Line } from 'react-chartjs-2'

/* 
Component ment to show e.x. number of commits, open issues, merges etc. over a timeperiod
Need to fix so that it can take in data. uses dummy data for now. 
*/
type ChartData = {
   dates: string[];
   merges: number[];
  };

/* setState in parent, pass states as props to this element. number of merges 
and their respective dates must be en the same order in the arrays of the props*/


export default class LineChart extends React.Component <ChartData> {
    data = {
        labels: this.props.dates,
        datasets: [{
            label: 'Merges',
            data: this.props.merges,
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
    
    options = {
        plugins: {
            title:{
                display: true, 
                text: "Merges pr day",
                padding: {
                    top: 20,
                    bottom: 25
                },
                font: {
                    size:30
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
                        top: 20,
                        bottom: 25
                    },
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    padding: {
                        top: 20,
                        bottom: 25
                    },
                }
            }
        }
    }

    render() {
        return <div className='mergeChart'>
            <Line data={this.data} options={this.options}></Line>
        </div>
    }
    
}