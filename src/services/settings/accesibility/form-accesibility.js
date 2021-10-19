import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

function action() {
    $('input').each(function (){
        var $element = $(this);
        var $label = $("label[for='"+$element.attr('id')+"']")
        if ($label.length == 0) {
          $label = $element.closest('label')
        }
        if ($label.length == 0) {

        } else {
          // label was found
        }
    })
}
