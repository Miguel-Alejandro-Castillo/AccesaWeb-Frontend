import { createAction } from 'redux-actions';

const handleBackgroundData = createAction('HANDLE_BACKGROUND_DATA');

function init(initialData) {
  return (dispatch, getState) => {
    dispatch(handleBackgroundData({
      lang: initialData.lang,
      turnedOn: initialData.turnedOn,
      speechRecognizerState: initialData.speechRecognizerState
    }));
  };
}

export default {
  init,
  handleBackgroundData
};
