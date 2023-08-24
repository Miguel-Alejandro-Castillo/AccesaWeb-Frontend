import _ from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

const getBookmarks = state => state.background.bookmarksTree || [];
const getHistory = state => state.background.history || [];
const getDownloads = state => state.background.downloads || [];


function getDate(time) {
  return moment(new Date(time)).format('MM/DD/YYYY');
}

let bookmarksIndex = 1;

function normalizeBookmarksSite(site) {
  const index = bookmarksIndex;
  bookmarksIndex = bookmarksIndex + 2;
  return {
    delete: index + 1,
    id: site.id,
    open: index,
    title: site.title,
    url: site.url
  };
}

function normalizeBookmarksFolder(folder) {
  const newFolder = {
    title: folder.title
  };
  if (folder.children) {
    newFolder.children = folder.children
        .filter(child => !(child.url === 'chrome://bookmarks/' || child.url === ''))
        .map(normalizeBookmarksNode);
  }
  return newFolder;
}

function normalizeBookmarksNode(node) {
  if (node.children) {
    return normalizeBookmarksFolder(node);
  }
  return normalizeBookmarksSite(node);
}

export const getBookmarksTree = createSelector(getBookmarks, bookmarksTree => {
  bookmarksIndex = 1;
  return bookmarksTree.map(normalizeBookmarksNode);
});

export const getHistoryRecords = createSelector(getHistory, history => {
  const historyRecordsWithActions = history.map((record, index) => ({...record, open: index + 1}));
  const historyRecordsGroupedByDate = _.groupBy(historyRecordsWithActions, record => getDate(record.lastVisitTime));
  return historyRecordsGroupedByDate;
});

export const getDownloadRecords = createSelector(getDownloads, downloads => {
  downloads = downloads.map((download, index) => ({
    complete: download.state === 'complete',
    file: _.last(download.filename.split('/')),
    filename: download.filename,
    id: download.id,
    mime: download.mime,
    startTime: download.startTime,
    url: download.url
  }));
  return _.groupBy(downloads, record => getDate(record.startTime));
});
