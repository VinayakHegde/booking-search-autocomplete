import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Autocomplete from './Autocomplete';
import Results from '../Results/Results';

describe('Autocomplete', () => {
  let wrapper, label, input;
  beforeEach(() => { 
    wrapper = shallow(<Autocomplete />);
    label = wrapper.find('label');
    input = wrapper.find('input');
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Autocomplete />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should contain label element', () => {
    expect(label.length).toEqual(1);
  });

  it('should contain input element', () => {
    expect(input.length).toEqual(1);
  });

  it('label element should be for input element', () => {
    expect(label.prop('htmlFor')).toEqual(input.prop('id'));
  });

  it('should contain Results component', () => {
    expect(wrapper.containsMatchingElement(<Results />)).toEqual(true);
  });

  describe('label', () => {
    it('should have text "Pick-up Location"', () => {
      expect(label.text()).toEqual('Pick-up Location');
    });
  });

  describe('input', () => {
    it('should have placeholder', () => {
      expect(input.prop('placeholder')).toEqual('city, airport, station, region and district...');
    });

    it('should have value same as state.term', () => {
      expect(input.prop('value')).toEqual(wrapper.state('term'));
    });

    it('should have onKeyup handler and change the component state', () => {
      input.simulate('keyup', {target : {
        name  : 'term',
        value : 'manchester'
      }});

      expect(wrapper.state('term')).toEqual('manchester');
    });

    it('should have onChange handler and change the component state', () => {
      input.simulate('change', {target : {
        name  : 'term',
        value : 'london'
      }});

      expect(wrapper.state('term')).toEqual('london');
    });
  });
});
