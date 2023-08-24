import classnames from 'classnames';
import React from 'react';

export default class ColorPicker extends React.Component {
  static propTypes = {
    colors: React.PropTypes.array.isRequired,
    getI18nText: React.PropTypes.func.isRequired,
    selectedColor: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.renderColor = this.renderColor.bind(this);
    this.renderXAxisButton = this.renderXAxisButton.bind(this);
    this.renderYAxisButton = this.renderYAxisButton.bind(this);
  }

  getArrayOf(number) {
    return Array.from(Array(number));
  }

  renderXAxisButton(value, index) {
    index = index + 11;
    const classNames = classnames({
      selected: this.props.x === index
    });
    return (
      <li key={index} className={classNames}><span className='button'>{index}</span></li>
    );
  }

  renderYAxisButton(value, index) {
    index = index + 1;
    const classNames = classnames({
      selected: this.props.y === index
    });
    return (
      <li key={index} className={classNames}><span className='button'>{index}</span></li>
    );
  }

  renderXAxis() {
    return (
      <ul className='x-axis'>
        {this.getArrayOf(20).map(this.renderXAxisButton)}
      </ul>
    );
  }

  renderYAxis() {
    return (
      <ul className='y-axis'>
        {this.getArrayOf(10).map(this.renderYAxisButton)}
      </ul>
    );
  }

  renderColor(color, index) {
    const style = {
      background: color
    };

    let ySelected = false;
    let xSelected = false;

    if (this.props.y) {
      const y = this.props.y - 1;
      ySelected = index >= y * 20 && index <= y * 20 + 19;
    }
    if (this.props.x) {
      const x = this.props.x - 11;
      xSelected = x === index % 20;
    }

    const classNames = classnames({xSelected, ySelected});

    return (
      <li className={classNames} key={color} style={style}/>
    );
  }

  renderSelectedColor() {
    const style = {background: this.props.selectedColor};
    return (
      <p>
        <span className='selected-color-title'>{this.props.getI18nText('selected-color')}</span>
        <span className='selected-color' style={style}/>
      </p>
    );
  }

  render() {
    return (
      <div className='display-upper-bar color-picker'>
        <div className='header'>
          <h3>{this.props.getI18nText('select-a-color')}</h3>
          <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
        </div>
        <div className='colors-container'>
          { this.renderXAxis() }
          <div className='y-axis-and-colors-container'>
            { this.renderYAxis() }
            <ul className='colors'>
              {this.props.colors.map(this.renderColor)}
            </ul>
          </div>
        </div>
        { this.renderSelectedColor() }
      </div>
    );
  }
}
