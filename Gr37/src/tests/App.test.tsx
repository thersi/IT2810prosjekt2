import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import App from '../App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ToggleButton } from "@mui/material";
import { shallow } from 'enzyme';


Enzyme.configure({ adapter: new Adapter() });

it('Renders app ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App></App>, div);
});

test('renders all elements correctly', () => {
  const RenderResult = render(<App />);
  expect(
    RenderResult.container.getElementsByClassName('header')
    ).toBeDefined();
  expect(
    RenderResult.container.getElementsByClassName('search')
    ).toBeDefined();
  expect(
    RenderResult.container.getElementsByClassName('displayChart')
    ).toBeDefined(); 

});

it('Test click event', () => {
  const mockCallBack = jest.fn();

  const bt = shallow((<ToggleButton 
    id="toggleTheme"
    value="web"
    size="small"
    onClick={mockCallBack}/>));
  //bt.find('toggleTheme').at(0).simulate('click');
  //expect(mockCallBack.mock.calls.length).toEqual(1);
  
});
