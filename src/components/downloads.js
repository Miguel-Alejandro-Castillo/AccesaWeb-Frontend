import _ from 'lodash';
import moment from 'moment';
import React from 'react';

export default class Downloads extends React.Component {
  static propTypes = {
    downloads: React.PropTypes.object.isRequired,
    getI18nText: React.PropTypes.func.isRequired
  }

  renderDownloads(downloads) {
    return downloads.map(record => {
      const endTime = moment(new Date(record.startTime)).format('h:mm a');
      return (
        <li key={record.id}>
          <div>
            <div className='history-site-header'>
              <h4><i className='fa fa-file-o fa-fw'/>{record.file}</h4>
              <span>{endTime}</span>
            </div>
            <p>{record.url}</p>
          </div>
          <p className='options'>
            {record.complete ? record.filename : this.props.getI18nText('stopped-download')}
          </p>
        </li>
      );
    });
  }

  renderDownloadsByDate() {
    return _.map(this.props.downloads, (sitesByDate, date) => {
      return (
        <div key={date}>
          <h3><i className='fa fa-calendar fa-fw'/>{moment(new Date(date)).format(this.props.getI18nText('date-format'))}</h3>
          <ul className='cards'>
            {this.renderDownloads(sitesByDate)}
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
              <h2><i className='fa fa-download fa-fw'/>{this.props.getI18nText('name')}</h2>
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
          <div className='body'>{this.renderDownloadsByDate()}</div>
          <p className='bottom-button-container'>
            <span className='button'><i className='fa fa-arrow-down fa-fw'/>{this.props.getI18nText('scroll-down')}</span>
          </p>
        </div>
      </div>
    );
  }
}
