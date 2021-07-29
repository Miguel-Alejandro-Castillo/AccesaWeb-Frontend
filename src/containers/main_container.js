import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import backgroundActions from '../actions/background_actions';
import {
  getBookmarksTree,
  getDownloadRecords,
  getHistoryRecords
} from '../selectors/background_selectors';
import commandActions from '../actions/commands_actions';
import main from '../components/main';

const mapStateToProps = (state) => {
  return {
    ...state.background,
    ...state.commands,
    bookmarksTree: getBookmarksTree(state),
    downloads: getDownloadRecords(state),
    history: getHistoryRecords(state)
  };
};

const actions = {
  ...commandActions,
  ...backgroundActions
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(main);
