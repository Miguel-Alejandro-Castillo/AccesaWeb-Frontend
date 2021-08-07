import React from 'react';
import ModuleHeader from './module-header';
import { getI18nText } from '../i18n/i18n';

function SettingDetail({setting}) {
  return (
    <div className='module-details row' id={setting.id || setting.name}>
      <div className='col-md-12 col-sm-12 col-xs-12'>
        <div className='x_panel'>
          <ModuleHeader
            icon={setting.icon}
            name={getI18nText(setting.name, setting.i18n)}
            id={setting.id}
            removeModule={()=>{}}
          />
        </div>
      </div>
    </div>
  );
}
SettingDetail.propTypes = {
  setting: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string
  }).isRequired
};
export default SettingDetail;