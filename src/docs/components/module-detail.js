import ModuleHeader from './module-header';
import ContextDetail from './module-context-detail';
import React from 'react';

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