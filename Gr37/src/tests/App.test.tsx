import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import App from '../App';

it('Renders register ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App></App>, div);
});

test('renders learn react link', () => {
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
