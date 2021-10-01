import React from 'react'
import ReactDOM from 'react-dom'
import Search from '../components/Search'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import App from '../App'
import { cleanup, render } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup);
let div: HTMLDivElement;


it('Search renders without crashing', () => {
    div = document.createElement('div');
    ReactDOM.render(<Search></Search>, div)

})

it('matches snapshot', () => {
    const tree = renderer.create(<Search></Search>).toJSON()
    expect(tree).toMatchSnapshot();
})

it('matches snapshot', () => {
    const tree = renderer.create(<App/>).toJSON()
    expect(tree).toMatchSnapshot();
})

 it('renders linechart correctly', () => {
    const x: any = Array('Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange')
    const y: any = Array(12, 19, 3, 5, 2, 3)
    const tree = renderer.create(<LineChart
        dates={x} merges={y}/>).toJSON
    expect(tree).toMatchSnapshot();
 })

 it('matches snapshot', () => {
    const tree = renderer.create(<BarChart xAxis={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
    yAxis={[12, 19, 3, 5, 2, 3]}/>).toJSON()
    expect(tree).toMatchSnapshot();
})