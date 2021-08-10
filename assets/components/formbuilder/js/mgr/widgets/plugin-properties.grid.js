FormBuilder.grid.PluginProperties = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.plugin_property_create'),
        cls         : 'primary-button',
        handler     : this.createPluginProperty,
        scope       : this
    }];

    var columns = new Ext.grid.ColumnModel({
        columns     : [{
            header      : _('formbuilder.label_plugin_property_key'),
            dataIndex   : 'key',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_plugin_property_value'),
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
        fields      : ['id', 'key', 'value', 'description'],
        store       : new Ext.data.JsonStore({
            fields      : ['id', 'key', 'value', 'description'],
            data        : Ext.decode(config.values) || [],
            remoteSort  : false
        }),
        paging      : false
    });

    FormBuilder.grid.PluginProperties.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.grid.PluginProperties, MODx.grid.LocalGrid, {
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.plugin_property_update'),
            handler : this.updatePluginProperty,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.plugin_property_remove'),
            handler : this.removePluginProperty,
            scope   : this
         }];
    },
    createPluginProperty: function(btn, e) {
        if (this.createPluginPropertyWindow) {
            this.createPluginPropertyWindow.destroy();
        }

        this.createPluginPropertyWindow = MODx.load({
            xtype       : 'formbuilder-window-plugin-property-create',
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

        this.createPluginPropertyWindow.show(e.target);
    },
    updatePluginProperty: function(btn, e) {
        if (this.updatePluginPropertyWindow) {
            this.updatePluginPropertyWindow.destroy();
        }

        this.updatePluginPropertyWindow = MODx.load({
            xtype       : 'formbuilder-window-plugin-property-update',
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

        this.updatePluginPropertyWindow.setValues(this.menu.record);
        this.updatePluginPropertyWindow.show(e.target);
    },
    removePluginProperty: function(btn, e) {
        Ext.MessageBox.confirm(_('formbuilder.plugin_property_remove'), _('formbuilder.plugin_property_remove_confirm'), function(event) {
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
                    value       : item.data.value || '',
                    description : item.data.description || ''
                };
            });

            if (method === 'create') {
                items[record.id] = {
                    id          : record.id,
                    key         : record.key || '',
                    value       : record.value || '',
                    description : record.description || ''
                };
            } else if (method === 'update') {
                items[record.id] = {
                    id          : record.id,
                    key         : record.key || '',
                    value       : record.value || '',
                    description : record.description || ''
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
                        value       : item.value,
                        description : item.description
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

Ext.reg('formbuilder-grid-plugin-properties', FormBuilder.grid.PluginProperties);

FormBuilder.window.CreatePluginProperty = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.plugin_property_create'),
        fields      : [{
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_key'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_key_desc'),
            name        : 'key',
            anchor      : '100%',
            allowBlank  : false,
            regex       : /^[a-zA-Z0-9_]+$/,
            regexText   : _('formbuilder.plugin_property_invalid_key')
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_key_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_value'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_value_desc'),
            name        : 'value',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_value_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textarea',
            fieldLabel  : _('formbuilder.label_plugin_property_description'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_description_desc'),
            name        : 'description',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_description_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.CreatePluginProperty.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreatePluginProperty, MODx.Window, {
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
    }
});

Ext.reg('formbuilder-window-plugin-property-create', FormBuilder.window.CreatePluginProperty);

FormBuilder.window.UpdatePluginProperty = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.plugin_property_update'),
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_key'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_key_desc'),
            name        : 'key',
            anchor      : '100%',
            allowBlank  : false,
            regex       : /^[a-zA-Z0-9_]+$/,
            regexText   : _('formbuilder.plugin_property_invalid_key')
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_key_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_plugin_property_value'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_value_desc'),
            name        : 'value',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_value_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'textarea',
            fieldLabel  : _('formbuilder.label_plugin_property_description'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_property_description_desc'),
            name        : 'description',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_plugin_property_description_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.UpdatePluginProperty.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdatePluginProperty, MODx.Window, {
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
    }
});

Ext.reg('formbuilder-window-plugin-property-update', FormBuilder.window.UpdatePluginProperty);