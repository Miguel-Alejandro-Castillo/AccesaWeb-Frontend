import React from 'react';

export default class TopSites extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    topSites: React.PropTypes.array.isRequired
  }

  renderTopSites() {
    return this.props.topSites.map((site, index) => {
      const key = index + 1;
      return (
        <li key={key}>
          <div>
            <h4>{site.title}</h4>
            <p>{site.url}</p>
          </div>
          <p className='options'>
            <button className='white-button'>
              <span className='button' data-key={key} data-url={site.url}>
                {key}
              </span>
              {this.props.getI18nText('open')}
            </button>
          </p>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='dialog'>
        <div className='container websites-gallery'>
          <div className='header'>
            <div className='title'>
              <h2><i className='fa fa-line-chart fa-fw'/>{this.props.getI18nText('name')}</h2>
            </div>
            <div>
              <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
            </div>
          </div>
          <div className='header-options'>
            <p className='top-button-container'>
              <span className='button'><i className='fa fa-arrow-up fa-fw'/>{this.props.getI18nText('scroll-up')}</span>
            </p>
          </div>
          <div className='body'>
            <ul className='cards'>{this.renderTopSites()}</ul>
          </div>
          <p className='bottom-button-container'>
            <span className='button'><i className='fa fa-arrow-down fa-fw'/>{this.props.getI18nText('scroll-down')}</span>
          </p>
        </div>
      </div>
    );
  }
}
