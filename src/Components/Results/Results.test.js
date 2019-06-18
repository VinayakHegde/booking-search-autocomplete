import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Results from './Results';


describe('Results', () => {
    let wrapper, children;
    beforeEach(() => { 
      wrapper = shallow(<Results />);
      children = wrapper.find('.result');
    });
  
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Results />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should have less than or equals to 6 children', () =>{
        expect(children.length).toBeLessThanOrEqual(6)
    });
});