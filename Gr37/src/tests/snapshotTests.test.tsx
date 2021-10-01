import React from 'react'
import ReactDOM from 'react-dom'
import Search from '../components/Search'
import BarChart from '../components/BarChart'
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

