import _ from 'lodash';
import moment from 'moment';
import React from 'react';

export default class History extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    history: React.PropTypes.object.isRequired
  }

  renderSites(sites) {
    return sites.map(site => {
      const title = site.title || this.props.getI18nText('no-title-provided');
      return (
        <li key={site.open}>
          <div>
            <div className='history-site-header'>
              <h4>{title}</h4>
              <span>{moment(new Date(site.lastVisitTime)).format('h:mm a')}</span>
            </div>
            <p>{site.url}</p>
          </div>
          <p className='options'>
            <button className='white-button'>
              <span className='button' data-key={site.open} data-url={site.url}>
                {site.open}
              </span>
              {this.props.getI18nText('open')}
            </button>
          </p>
        </li>
      );
    });
  }

  renderSitesByDate() {
    return _.map(this.props.history, (sitesByDate, date) => {
      return (
        <div key={date}>
          <h3><i className='fa fa-calendar fa-fw'/>{moment(new Date(date)).format(this.props.getI18nText('date-format'))}</h3>
          <ul className='cards'>
            {this.renderSites(sitesByDate)}
          </ul>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='dialog'>
        <div className='container websites-gallery'>
          <div className='header'>
            <div className='title'>
              <h2><i className='fa fa-history fa-fw'/>{this.props.getI18nText('name')}</h2>
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
          <div className='body'>{this.renderSitesByDate()}</div>
          <p className='bottom-button-container'>
            <span className='button'><i className='fa fa-arrow-down fa-fw'/>{this.props.getI18nText('scroll-down')}</span>
          </p>
        </div>
      </div>
    );
  }
}
