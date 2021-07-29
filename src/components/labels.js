import _ from 'lodash';
import { getVisibleElements } from '../services/element_selectors';
import React from 'react';


export default class Label extends React.Component {
  static propTypes = {
    labels: React.PropTypes.string.isRequired
  }

  renderLabel(element, value) {
    const left = window.scrollX + element.rect.left;
    const top = window.scrollY + element.rect.top;
    const containerStyle = {
      height: element.el.offsetHeight,
      left: left >= 0 ? left : 0,
      top: top >= 0 ? top : 0,
      width: element.el.offsetWidth
    };
    const labelStyle = {};
    if (left === 0) {
      labelStyle.marginLeft = 0;
      labelStyle.borderBottomLeftRadius = 0;
    };
    if (top === 0) {
      labelStyle.marginTop = 0;
      labelStyle.borderTopRightRadius = 0;
    };
    return (
      <div style={containerStyle} key={value} className='label'>
        <span style={labelStyle}>{value}</span>
        <div />
      </div>
    );
  }

  render() {
    let labels = [];
    if (this.props.labels) {
      const elements = getVisibleElements(this.props.labels);
      labels = _.map(elements, (element, index) => this.renderLabel(element, index + 1));
    }

    return (
      <div>
        {labels}
      </div>
    );
  }
}
