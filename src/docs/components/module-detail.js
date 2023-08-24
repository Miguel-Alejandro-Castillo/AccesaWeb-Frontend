import { getI18nText } from '../i18n/i18n';
import ContextDetail from './module-context-detail';
import React from 'react';

function ModuleHeader({icon, name, id, imported, removeModule}) {
  return (
    <div className='x_title'>
      <h2>
        {icon ? <i className={icon}/> : ''}
        {name}
      </h2>
      {imported ? (
        <div className='nav navbar-right'>
          <button type='button' className='btn btn-danger remove-button' onClick={() => removeModule(id)}>
            <i className='fa fa-times' aria-hidden='true'/>
            {getI18nText('remove')}
          </button>
        </div>) : null}
      <div className='clearfix'/>
    </div>
  );
}
ModuleHeader.propTypes = {
  icon: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  imported: React.PropTypes.bool,
  removeModule: React.PropTypes.func.isRequired
};

function ModuleBody({description, contexts}) {
  return (
    <div className='x_content'>
      <p>
        {description}
      </p>
      {contexts.map(context => <ContextDetail context={context} key={context.name}/>)}
    </div>
  );
}
ModuleBody.propTypes = {
  contexts: React.PropTypes.array.isRequired,
  description: React.PropTypes.string.isRequired
};

function ModuleDetail({module, removeModule}) {
  return (
    <div className='module-details row' id={module.id || module.name}>
      <div className='col-md-12 col-sm-12 col-xs-12'>
        <div className='x_panel'>
          <ModuleHeader
            icon={module.icon}
            name={module.name}
            id={module.id}
            imported={module.imported}
            removeModule={removeModule}/>
          <ModuleBody contexts={module.contexts} description={module.description} />
        </div>
      </div>
    </div>
  );
}
ModuleDetail.propTypes = {
  module: React.PropTypes.shape({
    contexts: React.PropTypes.array.isRequired,
    description: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    id: React.PropTypes.string,
    imported: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired
  }).isRequired,
  removeModule: React.PropTypes.func.isRequired
};
export default ModuleDetail;
