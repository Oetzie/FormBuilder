Ext.onReady(function() {
    MODx.load({
        xtype : 'formbuilder-page-admin'
    });
});

FormBuilder.page.Admin = function(config) {
    config = config || {};

    config.buttons = [];

    if (FormBuilder.config.branding_url) {
        config.buttons.push({
            text        : 'Form Builder ' + FormBuilder.config.version,
            cls         : 'x-btn-branding',
            handler     : this.loadBranding
        });
    }

    config.buttons.push({
        text        : '<i class="icon icon-eye"></i>' + _('formbuilder.default_view'),
        handler     : this.toDefaultView,
        scope       : this
    }, '-');

    if (FormBuilder.config.branding_url_help) {
        config.buttons.push({
            text        : _('help_ex'),
            handler     : MODx.loadHelpPane,
            scope       : this
        });
    }

    Ext.applyIf(config, {
        components  : [{
            xtype       : 'formbuilder-panel-admin',
            renderTo    : 'formbuilder-panel-admin-div'
        }]
    });

    FormBuilder.page.Admin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.page.Admin, MODx.Component, {
    loadBranding: function(btn) {
        window.open(FormBuilder.config.branding_url);
    },
    toDefaultView: function() {
        MODx.loadPage('?a=home&namespace=' + FormBuilder.config.namespace);
    }
});

Ext.reg('formbuilder-page-admin', FormBuilder.page.Admin);