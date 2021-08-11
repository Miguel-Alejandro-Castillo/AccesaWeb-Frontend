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
export default ModuleBody;