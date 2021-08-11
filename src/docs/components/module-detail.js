import React from 'react';
import ModuleBody from './module-body';
import ModuleHeader from './module-header';

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