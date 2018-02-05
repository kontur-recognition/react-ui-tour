import * as React from 'react';
import {shallow} from 'enzyme';

import {Highlight} from '../src/lib';

describe('Highlight testing', () => {
  const customHighlight = <div style={{border: '3px solid red', padding: '10px'}}/>;

  it('should render a Highlight', () => {
    const wrapper = shallow(<Highlight
      pos={document.documentElement.getBoundingClientRect()}
      highlight={customHighlight}
    />);

    expect(wrapper.prop('children')).toEqual(customHighlight);
  });

  it('should render a Highlight with backgroundColor and rootOffset', () => {
    const wrapper = shallow(<Highlight
      pos={document.documentElement.getBoundingClientRect()}
      highlight={customHighlight}
      color='red'
    />);

    expect(wrapper.prop('style').borderColor).toEqual('red');
  });
});

