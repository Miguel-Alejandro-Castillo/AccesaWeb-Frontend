import { getI18nText } from '../i18n/i18n';
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
      </div>) : null
    }
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
export default ModuleHeader;