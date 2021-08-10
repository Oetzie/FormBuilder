FormBuilder.grid.FormPluginProperties = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.form_plugin_property_create'),
        cls         : 'primary-button',
        handler     : this.createFormPluginProperty,
        scope       : this
    }];

    console.log(config.plugin);

    var columns = new Ext.grid.ColumnModel({
        columns     : [{
            header      : _('formbuilder.label_form_plugin_property_key'),
            dataIndex   : 'key',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_form_plugin_property_value'),
            dataIndex   : 'value',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true
        }]
    });
    
    Ext.applyIf(config, {
        autoHeight  : true,
        cm          : columns,
        id          : 'formbuilder-grid-plugin-properties',
        fields      : ['id', 'key', 'value'],
        store       : new Ext.data.JsonStore({
            fields      : ['id', 'key', 'value'],
            data        : Ext.decode(config.values) || [],
            remoteSort  : false
        }),
        paging      : false
    });

    FormBuilder.grid.FormPluginProperties.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.grid.FormPluginProperties, MODx.grid.LocalGrid, {
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.form_plugin_property_update'),
            handler : this.updateFormPluginProperty,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.form_plugin_property_remove'),
            handler : this.removeFormPluginProperty,
            scope   : this
         }];
    },
    createFormPluginProperty: function(btn, e) {
        if (this.createFormPluginPropertyWindow) {
            this.createFormPluginPropertyWindow.destroy();
        }

        this.createFormPluginPropertyWindow = MODx.load({
            xtype       : 'formbuilder-window-form-plugin-property-create',
            plugin      : this.plugin,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : function(f) {
                        this.onUpdateStore(f.getValues(), 'create');
                    },
                    scope       : this
                }
            }
        });

        this.createFormPluginPropertyWindow.show(e.target);
    },
    updateFormPluginProperty: function(btn, e) {
        if (this.updateFormPluginPropertyWindow) {
            this.updateFormPluginPropertyWindow.destroy();
        }

        this.updateFormPluginPropertyWindow = MODx.load({
            xtype       : 'formbuilder-window-form-plugin-property-update',
            plugin      : this.plugin,
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : function(f) {
                        this.onUpdateStore(f.getValues(), 'update');
                    },
                    scope       : this
                }
            }
        });

        this.updateFormPluginPropertyWindow.setValues(this.menu.record);
        this.updateFormPluginPropertyWindow.show(e.target);
    },
    removeFormPluginProperty: function(btn, e) {
        Ext.MessageBox.confirm(_('formbuilder.form_plugin_property_remove'), _('formbuilder.form_plugin_property_remove_confirm'), function(event) {
            if ('yes' === event) {
                this.onUpdateStore(this.menu.record, 'remove');
            }
        }, this);
    },
    onUpdateStore: function(record, method) {
        var store = this.getStore();

        if (store) {
            var data    = [];
            var items   = {};

            if (!record.id) {
                record.id = Math.random().toString(36).substr(2, 9);
            }

            store.data.items.forEach(function(item, index) {
                items[item.data.id] = {
                    id          : item.data.id,
                    key         : item.data.key || '',
                    value       : item.data.value || ''
                };
            });

            if (method === 'create') {
                items[record.id] = {
                    id          : record.id,
                    key         : record.key || '',
                    value       : record.value || ''
                };
            } else if (method === 'update') {
                items[record.id] = {
                    id          : record.id,
                    key         : record.key || '',
                    value       : record.value || ''
                };
            } else if (method === 'remove') {
                items[record.id] = {
                    id          : null
                };
            }

            var sortedItems = Object.values(items);

            sortedItems.sort(function(a, b) {
                if (a.key < b.key) {
                    return -1;
                }

                if (a.key > b.key) {
                    return 1;
                }

                return 0;
            });

            sortedItems.forEach(function(item) {
                if (item.id !== null) {
                    data.push({
                        id          : item.id,
                        key         : item.key,
                        value       : item.value
                    });
                }
            });

            store.loadData(data);

            this.fireEvent('change', this, data);
        }

        this.getView().refresh();
    },
    renderBoolean: function(d, c) {
        c.css = parseInt(d) === 1 || d ? 'green' : 'red';

        return parseInt(d) === 1 || d ? _('yes') : _('no');
    },
    renderDate: function(a) {
        if (Ext.isEmpty(a)) {
            return '—';
        }

        return a;
    }
});

Ext.reg('formbuilder-grid-form-plugin-properties', FormBuilder.grid.FormPluginProperties);

FormBuilder.window.CreateFormPluginProperty = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.plugin_property_create'),
        fields      : [{
            xtype       : 'formbuilder-combo-plugin-properties',
            fieldLabel  : _('formbuilder.label_plugin_property_key'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_key_desc'),
            name        : 'key',
            anchor      : '100%',
            allowBlank  : false,
            plugin      : config.plugin.plugin_id,
            listeners   : {
                select      : {
                    fn          : this.onUpdateProperty,
                    scope       : this
                }
            }
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_key_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_value'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_value_desc'),
            name        : 'value',
            anchor      : '100%',
            id          : 'formbuilder-window-form-plugin-property-create-value'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_value_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.CreateFormPluginProperty.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreateFormPluginProperty, MODx.Window, {
    submit: function(close) {
        var f = this.fp.getForm();

        if (f.isValid() && this.fireEvent('beforeSubmit', f.getValues())) {
            if (this.config.success) {
                Ext.callback(this.config.success, this.config.scope || this, [f]);
            }

            if (this.fireEvent('success', f)) {
                if (this.config.closeAction !== 'close') {
                    this.hide();
                } else {
                    this.close();
                }
            }
        }
    },
    onUpdateProperty: function(combo, data) {
        var tf = Ext.getCmp('formbuilder-window-form-plugin-property-create-value');

        if (tf) {
            tf.setValue(data.data.value);
        }
    }
});

Ext.reg('formbuilder-window-form-plugin-property-create', FormBuilder.window.CreateFormPluginProperty);

FormBuilder.window.UpdateFormPluginProperty = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.plugin_property_update'),
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'formbuilder-combo-plugin-properties',
            fieldLabel  : _('formbuilder.label_plugin_property_key'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_key_desc'),
            name        : 'key',
            anchor      : '100%',
            allowBlank  : false,
            plugin      : config.plugin.plugin_id,
            listeners   : {
                select      : {
                    fn          : this.onUpdateProperty,
                    scope       : this
                }
            }
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_key_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_value'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_value_desc'),
            name        : 'value',
            anchor      : '100%',
            id          : 'formbuilder-window-form-plugin-property-update-value'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_value_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.UpdateFormPluginProperty.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateFormPluginProperty, MODx.Window, {
    submit: function(close) {
        var f = this.fp.getForm();

        if (f.isValid() && this.fireEvent('beforeSubmit', f.getValues())) {
            if (this.config.success) {
                Ext.callback(this.config.success, this.config.scope || this, [f]);
            }

            if (this.fireEvent('success', f)) {
                if (this.config.closeAction !== 'close') {
                    this.hide();
                } else {
                    this.close();
                }
            }
        }
    },
    onUpdateProperty: function(combo, data) {
        var tf = Ext.getCmp('formbuilder-window-form-plugin-property-update-value');

        if (tf) {
            tf.setValue(data.data.value);
        }
    }
});

Ext.reg('formbuilder-window-form-plugin-property-update', FormBuilder.window.UpdateFormPluginProperty);