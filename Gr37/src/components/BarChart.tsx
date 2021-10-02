import { Bar } from 'react-chartjs-2'

/* 
Component ment to show number of commits per person 
*/

export default function BarChart({ xAxis, yAxis }: { xAxis: Array<string>; yAxis: Array<number> }) {
/* The component takes inn an array of "members" and and array og "commits pr. member"
Members are displayed at the x-axis, and number of commits at the y-axis.
Lists of colores for the different x-axis elements in the diagram are provided */
    const data = {
        labels: xAxis,
        datasets: [{
            label: 'Number of commits',
            data: yAxis,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }],
        title: {
            text: "Number of commits per person",
            fontSize: 25
        }
    }
    // Visual options 
    const options = {
        maintainAspectRatio: false,

        plugins: {
            title: {    
                display: true,
                text: "Number of commits per person",
                padding: {
                    top: 20,
                    bottom: 25
                },
                font: {
                    size: 20,
                },
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Commits',
                    padding: {
                        top: 5,
                        bottom: 5
                    },
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Member ids',
                    padding: {
                        top: 5,
                        bottom: 25
                    },
                }
            }
        }
    }
    return (
        
            <Bar id="barChart" data={data} options={options} />
        
    )
}
