import $ from 'jquery';
import React from 'react';

import Bookmarks from './bookmarks';
import ColorPicker from './color-picker';
import CommandFeedback from './command-feedback';
import DatePicker from './date-picker';
import Display from './display';
import Downloads from './downloads';
import Help from './help';
import HelpBar from './help-bar';
import History from './history';
import ImageOptions from './image-options';
import Keyboard from './keyboard';
import Labels from './labels';
import LinkOptions from './link-options';
import MediaControllers from './media-controllers';
import Open from './open';
import OptionsSelector from './options-selector';
import PickLabelOptions from './pick-label-options';
import RangeOptions from './range-options';
import Search from './search';
import TextFinder from './text-finder';
import TextOptions from './text-options';
import TopSites from './top-sites';

const datePickerContexts = ['dateOptions', 'datetimeOptions', 'monthOptions', 'timeOptions', 'weekOptions'];

export default class Main extends React.Component {
  static propTypes = {
    allowedCommands: React.PropTypes.array,
    colors: React.PropTypes.array,
    bookmarksTree: React.PropTypes.array,
    commandExecution: React.PropTypes.shape({
      command: React.PropTypes.string.isRequired,
      executed: React.PropTypes.bool.isRequired
    }),
    context: React.PropTypes.string.isRequired,
    displayKeyboard: React.PropTypes.bool,
    displayTextFinder: React.PropTypes.bool,
    downloads: React.PropTypes.object,
    findingText: React.PropTypes.bool,
    formatedDate: React.PropTypes.string,
    getI18nText: React.PropTypes.func.isRequired,
    history: React.PropTypes.object,
    keyboard: React.PropTypes.oneOf(['general', 'shift', 'numbers']),
    labels: React.PropTypes.string,
    lang: React.PropTypes.string.isRequired,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    openTab: React.PropTypes.string,
    options: React.PropTypes.array,
    reloadCommandTranslations: React.PropTypes.func.isRequired,
    selectedColor: React.PropTypes.string,
    selectedDate: React.PropTypes.instanceOf(Date),
    selectedElement: React.PropTypes.object,
    selectedElementValues: React.PropTypes.array,
    selectedNumber: React.PropTypes.number,
    selectedOption: React.PropTypes.string,
    showHelpBar: React.PropTypes.bool,
    showHelp: React.PropTypes.bool,
    submitTextToFind: React.PropTypes.func.isRequired,
    topSites: React.PropTypes.array,
    turnedOn: React.PropTypes.bool.isRequired,
    updateSelectedElement: React.PropTypes.func.isRequired,
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.getI18nText = this.getI18nText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.turnedOn && nextProps.selectedElement !== this.props.selectedElement) {
      if (this.props.selectedElement) {
        $(this.props.selectedElement).removeClass('highlight-selected-element');
      }
      if (nextProps.selectedElement) {
        $(nextProps.selectedElement).addClass('highlight-selected-element');
      }
    }
    if (!this.props.turnedOn && this.props.selectedElement) {
      $(this.props.selectedElement).removeClass('highlight-selected-element');
    }
    if (this.props.lang !== nextProps.lang) {
      this.props.reloadCommandTranslations();
    }
  }

  componentDidUpdate() {
    if (!this.props.turnedOn) {
      $('body').css({
        'margin-bottom': 0
      });
    } else {
      $('body').css({
        'margin-bottom': this.refs.displayContainer.offsetHeight + 50
      });
    }
  }

  getI18nText(key) {
    return this.props.getI18nText(`i18n-${key}`, this.props.context, this.props.lang);
  }

  renderBookmarks() {
    if (this.props.context === 'bookmarks') {
      return (
        <Bookmarks
          bookmarksTree={this.props.bookmarksTree}
          getI18nText={this.getI18nText}
        />
      );
    }
  }

  renderTopSites() {
    if (this.props.context === 'top-sites') {
      return (
        <TopSites
          getI18nText={this.getI18nText}
          topSites={this.props.topSites}
        />
      );
    }
  }

  renderHistory() {
    if (this.props.context === 'history') {
      return (
        <History
          getI18nText={this.getI18nText}
          history={this.props.history}
        />
      );
    }
  }

  renderDownloads() {
    if (this.props.context === 'downloads') {
      return (
        <Downloads
          getI18nText={this.getI18nText}
          downloads={this.props.downloads}
        />
      );
    }
  }

  renderTextFinder() {
    if (this.props.displayTextFinder) {
      return (
        <TextFinder
          findingText={this.props.findingText}
          getI18nText={this.getI18nText}
          submitTextToFind={this.props.submitTextToFind}
          updateSelectedElement={this.props.updateSelectedElement}
        />
      );
    }
  }

  renderMediaControllers() {
    if (this.props.context === 'media') {
      return (<MediaControllers getI18nText={this.getI18nText} />);
    }
  }

  renderHelpBar() {
    if (this.props.showHelpBar) {
      return (
        <HelpBar
          commands={this.props.allowedCommands}
          getI18nText={this.getI18nText}
        />
      );
    }
  }

  renderKeyboard() {
    if (this.props.context === 'introduceText') {
      return <Keyboard type={this.props.keyboard} getI18nText={this.getI18nText} displayKeyboard={this.props.displayKeyboard}/>;
    }
  }

  renderTextOptions() {
    if (this.props.context === 'textOptions') {
      return <TextOptions getI18nText={this.getI18nText} />;
    }
  }

  renderLinkOptions() {
    if (this.props.context === 'linkOptions') {
      return <LinkOptions getI18nText={this.getI18nText} />;
    }
  }

  renderImageOptions() {
    if (this.props.context === 'imageOptions') {
      return <ImageOptions getI18nText={this.getI18nText} />;
    }
  }

  renderOptionsSelector() {
    if (this.props.context === 'selectOptions') {
      return <OptionsSelector getI18nText={this.getI18nText} options={this.props.selectedElementValues}/>;
    }
  }

  renderColorPicker() {
    if (this.props.context === 'colorOptions') {
      return (
        <ColorPicker
          colors={this.props.colors}
          getI18nText={this.getI18nText}
          x={this.props.x}
          y={this.props.y}
          selectedColor={this.props.selectedColor}
        />
      );
    }
  }

  renderRangeOptions() {
    if (this.props.context === 'rangeOptions') {
      return (
        <RangeOptions
          getI18nText={this.getI18nText}
          max={this.props.max}
          min={this.props.min}
          selectedNumber={this.props.selectedNumber}
        />
      );
    }
  }

  renderDatePicker() {
    if (datePickerContexts.includes(this.props.context)) {
      return (
        <DatePicker
          formatedDate={this.props.formatedDate}
          selectedOption={this.props.selectedOption}
          getI18nText={this.getI18nText}
          date={this.props.selectedDate}
          options={this.props.options}
        />
      );
    }
  }

  renderLabels() {
    if (this.props.labels ) {
      return (
        <Labels labels={this.props.labels} />
      );
    }
  }

  renderHelp() {
    if (this.props.showHelp) {
      return (
        <Help
          commands={this.props.allowedCommands}
          getI18nText={this.getI18nText} />
      );
    }
  }

  renderSearchOptions() {
    if (this.props.context === 'search') {
      return <Search getI18nText={this.getI18nText} />;
    }
  }

  renderPickLabelOptions() {
    if (this.props.context === 'pickLabel') {
      return <PickLabelOptions getI18nText={this.getI18nText} />;
    }
  }

  renderOpenOptions() {
    if (this.props.context === 'open') {
      return <Open getI18nText={this.getI18nText} />;
    }
  }

  render() {
    if (!this.props.turnedOn) {
      return null;
    }
    return (
      <div>
        { this.renderHelp() }
        { this.renderBookmarks() }
        { this.renderTopSites() }
        { this.renderHistory() }
        { this.renderDownloads() }
        { this.renderLabels() }
        { this.renderHelpBar() }

        <div ref='displayContainer' className='display-container'>
          <CommandFeedback commandExecution={this.props.commandExecution} getI18nText={this.getI18nText}/>
          { this.renderTextFinder() }
          { this.renderMediaControllers() }
          { this.renderKeyboard() }
          { this.renderTextOptions() }
          { this.renderLinkOptions() }
          { this.renderImageOptions() }
          { this.renderSearchOptions() }
          { this.renderOpenOptions() }
          { this.renderOptionsSelector() }
          { this.renderColorPicker() }
          { this.renderRangeOptions() }
          { this.renderDatePicker() }
          { this.renderPickLabelOptions() }
          <Display {...this.props} />
        </div>
      </div>
    );
  }
}
