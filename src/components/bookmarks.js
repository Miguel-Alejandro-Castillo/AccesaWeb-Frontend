import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

export default class Bookmarks extends React.Component {
  static propTypes = {
    bookmarksTree: React.PropTypes.array,
    getI18nText: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.renderNode = this.renderNode.bind(this);
  }

  renderItem(site) {
    return (
      <li key={site.open}>
        <div>
          <h4>{site.title}</h4>
          <p>{site.url}</p>
        </div>
        <p className='options'>
          <button className='white-button'>
            <span className='button' data-key={site.open} data-url={site.url}>
              {site.open}
            </span>
            {this.props.getI18nText('open')}
          </button>
          <button className='white-button'>
            <span className='button' data-key={site.delete} data-id={site.id}>
              {site.delete}
            </span>
            {this.props.getI18nText('delete')}
          </button>
        </p>
      </li>
    );
  }

  renderFolder(folder) {
    const cards = _.every(folder.children, child => !child.children);
    const className = classnames({
      'cards': cards,
      'folder': !cards
    });
    return (
      <li key={folder.title}>
        {folder.title ?
          (<h3><i className='fa fa-folder-open-o fa-fw'/>{folder.title}</h3>) : null }
        <ul className={className}>{folder.children.map(this.renderNode)}</ul>
      </li>
    );
  }

  renderNode(node) {
    if (node.children) {
      return this.renderFolder(node);
    } else {
      return this.renderItem(node);
    }
  }

  renderBookmarks() {
    if (this.props.bookmarksTree.length) {
      return this.props.bookmarksTree.map(this.renderNode);
    }
  }

  render() {
    return (
      <div className='dialog'>
        <div className='container websites-gallery bookmarks'>
          <div className='header'>
            <div className='title'>
              <h2><i className='fa fa-bookmark fa-fw'/>{this.props.getI18nText('name')}</h2>
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
            <ul>{this.renderBookmarks()}</ul>
          </div>
          <p className='bottom-button-container'>
            <span className='button'><i className='fa fa-arrow-down fa-fw'/>{this.props.getI18nText('scroll-down')}</span>
          </p>
        </div>
      </div>
    );
  }
}
