FormBuilder.panel.Home = function(config) {
    config = config || {};

    Ext.apply(config, {
        id          : 'formbuilder-panel-home',
        cls         : 'container',
        items       : [{
            html        : '<h2>' + _('formbuilder') + '</h2>',
            cls         : 'modx-page-header'
        }, {
            layout      : 'form',
            items       : [{
                html        : '<p>' + _('formbuilder.forms_desc') + '</p>',
                bodyCssClass : 'panel-desc'
            }, {
                xtype       : 'formbuilder-grid-forms',
                cls         : 'main-wrapper',
                preventRender : true
            }]
        }]
    });

    FormBuilder.panel.Home.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.panel.Home, MODx.FormPanel);

Ext.reg('formbuilder-panel-home', FormBuilder.panel.Home);