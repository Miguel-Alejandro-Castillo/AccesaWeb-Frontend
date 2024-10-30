function changeAlign() {
    var event = new CustomEvent('modificarDOM', { detail: { action: 'changeAlign' } });
    document.dispatchEvent(event);
}

function changeFont() {
    var event = new CustomEvent('modificarDOM', { detail: { action: 'changeFont' } });
    document.dispatchEvent(event);
}

function changeFontSize() {
    var event = new CustomEvent('modificarDOM', { detail: { action: 'changeFontSize' } });
    document.dispatchEvent(event);
}

function changeLineSpacing() {
    var event = new CustomEvent('modificarDOM', { detail: { action: 'changeLineSpacing' } });
    document.dispatchEvent(event);
}

function changeParagraphSpacing() {
    var event = new CustomEvent('modificarDOM', { detail: { action: 'changeParagraphSpacing' } });
    document.dispatchEvent(event);
}


export default {
    name: 'i18n-name',
    description: 'i18n-description',
    icon: 'fa fa-image',
    contexts: [
        {
            context: 'root',
            commands: [
                {
                    name: 'i18n-command.change-align',
                    action: changeAlign,
                    help: 'i18n-help.change-align',
                    group: 'i18n-group.change-align'
                },
                {
                    name: 'i18n-command.change-font',
                    action: changeFont,
                    help: 'i18n-help.change-font',
                    group: 'i18n-group.change-font'
                },
                {
                    name: 'i18n-command.change-font-size',
                    action: changeFontSize,
                    help: 'i18n-help.change-font-size',
                    group: 'i18n-group.change-font-size'
                },
                {
                    name: 'i18n-command.change-line-spacing',
                    action: changeLineSpacing,
                    help: 'i18n-help.change-line-spacing',
                    group: 'i18n-group.change-line-spacing'
                },
                {
                    name: 'i18n-command.change-paragraph-spacing',
                    action: changeParagraphSpacing,
                    help: 'i18n-help.change-paragraph-spacing',
                    group: 'i18n-group.change-paragraph-spacing'
                }
            ],
            i18n: {
                en: {
                    'command.change-align': 'Change align',
                    'help.change-align': 'Align the text of the visited pages',
                    'group.change-align': 'Change align',
                    'command.change-font': 'Change font',
                    'help.change-font': 'Change font type.',
                    'group.change-font': 'Change font',
                    'command.change-font-size': 'Font size',
                    'help.change-font-size': 'Change font size',
                    'group.change-font-size': 'Font size',
                    'command.change-line-spacing': 'Line spacing',
                    'help.change-line-spacing': 'Add line spacing',
                    'group.change-line-spacing': 'Line spacing',
                    'command.change-paragraph-spacing': 'Paragraph spacing',
                    'help.change-paragraph-spacing': 'Add paragragraph spacing',
                    'group.change-paragraph-spacing': 'Paragraph spacing'
                },
                es: {
                    'command.change-align': 'cambiar alineación',
                    'help.change-align': 'Alinear el texto de las paginas visitadas',
                    'group.change-align': 'Cambiar alineación',
                    'command.change-font': 'cambiar fuente',
                    'help.change-font': 'Cambia el tipo de letra.',
                    'group.change-font': 'Cambiar fuente',
                    'command.change-font-size': 'cambiar tamaño del texto',
                    'help.change-font-size': 'Cambiar el tamaño del texto',
                    'group.change-font-size': 'Tamaño de fuente',
                    'command.change-line-spacing': 'cambiar espaciado',
                    'help.change-line-spacing': 'Agregar espaciado entre renglones',
                    'group.change-line-spacing': 'Espaciado',
                    'command.change-paragraph-spacing': 'cambiar espaciado entre parrafos',
                    'help.change-paragraph-spacing': 'Agregar espaciado entre parrafos',
                    'group.change-paragraph-spacing': 'Espaciado entre parrafos'
                }
            }
        }
    ],
    i18n: {
        en: {
            'name': 'Format',
            'description': 'This module allows you to customize the text format'
        },
        es: {
            'name': 'Formato',
            'description': 'Este modulo permite personalizar el formato del texto'
        }
    }
};  