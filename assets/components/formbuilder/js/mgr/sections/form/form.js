Ext.onReady(function() {
    MODx.load({
        xtype : 'formbuilder-page-form'
    });
});

FormBuilder.page.Form = function(config) {
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
        text        : '<i class="icon icon-arrow-left"></i>' + _('formbuilder.back_to_forms'),
        handler     : this.toFormsView,
        scope       : this
    }, {
        text        : _('save'),
        cls         : 'primary-button',
        id          : 'modx-abtn-save',
        method      : 'remote',
        process     : 'mgr/forms/manage',
        keys        : [{
            ctrl        : true,
            key         : MODx.config.keymap_save || 's'
        }]
    });

    config.buttons.push({
        text        : _('delete'),
        handler     : this.removeForm,
        scope       : this
    });

    config.buttons.push({
        text        : _('cancel'),
        process     : 'cancel',
        params      : {
            a           : 'home',
            namespace   : MODx.request.namespace
        }
    });

    if (FormBuilder.config.branding_url_help) {
        config.buttons.push({
            text        : _('help_ex'),
            handler     : MODx.loadHelpPane,
            scope       : this
        });
    }

    Ext.applyIf(config, {
        formpanel   : 'formbuilder-panel-form',
        components  : [{
            xtype       : 'formbuilder-panel-form',
            record      : FormBuilder.config.record
        }]
    });

    FormBuilder.page.Form.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.page.Form, MODx.Component, {
    loadBranding: function(btn) {
        window.open(FormBuilder.config.branding_url);
    },
    toFormsView: function() {
        MODx.loadPage('home', 'namespace=' + MODx.request.namespace);
    },
    removeForm: function() {
        MODx.msg.confirm({
            title       : _('formbuilder.form_remove'),
            text        : _('formbuilder.form_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/remove',
                id          : FormBuilder.config.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : function() {
                        MODx.loadPage('?a=home&namespace=' + MODx.request.namespace);
                    },
                    scope       : this
                }
            }
        });
    }
});

Ext.reg('formbuilder-page-form', FormBuilder.page.Form);