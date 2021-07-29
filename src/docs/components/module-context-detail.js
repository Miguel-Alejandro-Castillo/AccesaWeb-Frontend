import _ from 'lodash';
import { getI18nText } from '../i18n/i18n';
import React from 'react';

function CommandList({commands, group}) {
  return (
    <div>
      {group ?
        <h3>{group}</h3> : null}
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>{getI18nText('i18n-command')}</th>
            <th>{getI18nText('i18n-description')}</th>
          </tr>
        </thead>
        <tbody>
          {commands.map(command => (
            <tr key={command.name}>
              <th scope='row'>{command.name}</th>
              <td>{command.help}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
CommandList.propTypes = {
  commands: React.PropTypes.array.isRequired,
  group: React.PropTypes.string.isRequired
};

function HtmlExample({html}) {
  return (
    <div>
      <h3>{getI18nText('i18n-test')}</h3>
      <p>{getI18nText('i18n-test-description')}</p>
      <div className='jumbotron'>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
  );
}
HtmlExample.propTypes = {
  html: React.PropTypes.string
};

function ContextDetail({context}) {
  return (
    <div>
      {!_.isEmpty(context.commands) ?
        <h3 className='context-title'>{getI18nText('i18n-context')} {context.name}</h3> : null}
      {_.map(context.commands, (commands, group) => <CommandList commands={commands} key={group} group={!_.isEmpty(context.commands) ? group : null} />)}
      {context.htmlExample ?
        <HtmlExample html={context.htmlExample} /> : null}
    </div>
  );
}
ContextDetail.propTypes = {
  context: React.PropTypes.shape({
    commands: React.PropTypes.object.isRequired,
    htmlExample: React.PropTypes.string,
    name: React.PropTypes.string.isRequired
  }).isRequired
};

export default ContextDetail;

