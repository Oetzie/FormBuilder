FormBuilder.panel.Admin = function(config) {
    config = config || {};

    Ext.apply(config, {
        id          : 'formbuilder-panel-admin',
        cls         : 'container',
        items       : [{
            html        : '<h2>' + _('formbuilder') + '</h2>',
            cls         : 'modx-page-header'
        }, {
            xtype       : 'modx-tabs',
            items       : [{
                layout      : 'form',
                title       : _('formbuilder.field_types'),
                items       : [{
                    html        : '<p>' + _('formbuilder.field_types_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    xtype       : 'formbuilder-grid-field-types',
                    cls         : 'main-wrapper',
                    preventRender : true
                }]
            }, {
                layout      : 'form',
                title       : _('formbuilder.plugins'),
                items       : [{
                    html        : '<p>' + _('formbuilder.plugins_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    xtype       : 'formbuilder-grid-plugins',
                    cls         : 'main-wrapper',
                    preventRender : true
                }]
            }]
        }]
    });

    FormBuilder.panel.Admin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.panel.Admin, MODx.FormPanel);

Ext.reg('formbuilder-panel-admin', FormBuilder.panel.Admin);