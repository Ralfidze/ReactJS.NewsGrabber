import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, { SearchComponent, Button, TableComponent } from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('Search', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchComponent>Search</SearchComponent>, div);  
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <SearchComponent>Search</SearchComponent>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });

  });

describe('Button', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Button>Search</Button>, div);  
    });
  
    test('has a valid snapshot', () => {
      const component = renderer.create(
        <Button>More</Button>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      });
      
    });

describe('Table', () => {
    const props = {
      list: [
        { title: '1', author:'1', num_comments: 1, points: 2, objectID: 'y'},
        { title: '2', author:'2', num_comments: 1, points: 2, objectID: 'x'}
      ],
      sortKey: 'NONE',
      isSortReverse: false,
    };

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<TableComponent { ...props } />, div);
    });

    test('has a valid snapshot', () => {
      const component = renderer.create(
        <TableComponent { ...props } />
      );
      let tree = component.toJSON();
    });

    it('shows two items in list', () => {
      const element = shallow(
        <TableComponent { ...props } />
      )

      expect(element.find('.table-row').length).toBe(2);
    });

});

