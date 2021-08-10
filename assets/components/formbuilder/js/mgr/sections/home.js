Ext.onReady(function() {
    MODx.load({
        xtype : 'formbuilder-page-home'
    });
});

FormBuilder.page.Home = function(config) {
    config = config || {};

    config.buttons = [];

    if (FormBuilder.config.branding_url) {
        config.buttons.push({
            text        : 'Form Builder ' + FormBuilder.config.version,
            cls         : 'x-btn-branding',
            handler     : this.loadBranding
        });
    }

    if (FormBuilder.config.has_permission) {
        config.buttons.push({
            text        : '<i class="icon icon-cogs"></i>' + _('formbuilder.admin_view'),
            handler     : this.toAdminView,
            scope       : this
        }, '-');
    }

    if (FormBuilder.config.branding_url_help) {
        config.buttons.push({
            text        : _('help_ex'),
            handler     : MODx.loadHelpPane,
            scope       : this
        });
    }

    Ext.applyIf(config, {
        components  : [{
            xtype       : 'formbuilder-panel-home',
            renderTo    : 'formbuilder-panel-home-div'
        }]
    });

    FormBuilder.page.Home.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.page.Home, MODx.Component, {
    loadBranding: function(btn) {
        window.open(FormBuilder.config.branding_url);
    },
    toAdminView: function() {
        MODx.loadPage('?a=admin&namespace=' + FormBuilder.config.namespace);
    }
});

Ext.reg('formbuilder-page-home', FormBuilder.page.Home);