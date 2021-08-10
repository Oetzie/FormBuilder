FormBuilder.grid.Plugins = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.plugin_create'),
        cls         : 'primary-button',
        handler     : this.createPlugin,
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'formbuilder-filter-plugins-search',
        id          : 'formbuilder-filter-plugins-search',
        emptyText   : _('search') + '...',
        listeners   : {
            'change'    : {
                fn          : this.filterSearch,
                scope       : this
            },
            'render'    : {
                fn          : function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key     : Ext.EventObject.ENTER,
                        fn      : this.blur,
                        scope   : cmp
                    });
                },
                scope       : this
            }
        }
    }, {
        xtype       : 'button',
        cls         : 'x-form-filter-clear',
        id          : 'formbuilder-filter-plugins-clear',
        text        : _('filter_clear'),
        listeners   : {
            'click'     : {
                fn          : this.clearFilter,
                scope       : this
            }
        }
    }];

    var columns = new Ext.grid.ColumnModel({
        columns     : [{
            header      : _('formbuilder.label_plugin_name'),
            dataIndex   : 'name_formatted',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true
        }, {
            header      : _('formbuilder.label_plugin_description'),
            dataIndex   : 'description_formatted',
            sortable    : false,
            editable    : false,
            width       : 250
        }, {
            header      : _('formbuilder.label_plugin_active'),
            dataIndex   : 'active',
            sortable    : true,
            editable    : false,
            width       : 100,
            fixed       : true,
            renderer    : this.renderBoolean
        }, {
            header      : _('last_modified'),
            dataIndex   : 'editedon',
            sortable    : true,
            editable    : false,
            fixed       : true,
            width       : 200,
            renderer    : this.renderDate
        }]
    });
    
    Ext.applyIf(config, {
        cm          : columns,
        id          : 'formbuilder-grid-plugins',
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/plugins/getlist'
        },
        fields      : ['id', 'name', 'description', 'snippet', 'properties', 'active', 'editedon', 'name_formatted', 'description_formatted'],
        paging      : true,
        pageSize    : MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30
    });

    FormBuilder.grid.Plugins.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.grid.Plugins, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();

        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('formbuilder-filter-plugins-search').reset();

        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.plugin_update'),
            handler : this.updatePlugin,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.plugin_remove'),
            handler : this.removePlugin,
            scope   : this
         }];
    },
    createPlugin: function(btn, e) {
        if (this.createPluginWindow) {
            this.createPluginWindow.destroy();
        }

        this.createPluginWindow = MODx.load({
            xtype       : 'formbuilder-window-plugin-create',
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.createPluginWindow.show(e.target);
    },
    updatePlugin: function(btn, e) {
        if (this.updatePluginWindow) {
            this.updatePluginWindow.destroy();
        }

        this.updatePluginWindow = MODx.load({
            xtype       : 'formbuilder-window-plugin-update',
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.updatePluginWindow.setValues(this.menu.record);
        this.updatePluginWindow.show(e.target);
    },
    removePlugin: function(btn, e) {
        MODx.msg.confirm({
            title       : _('formbuilder.plugin_remove'),
            text        : _('formbuilder.plugin_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/plugins/remove',
                id          : this.menu.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });
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

Ext.reg('formbuilder-grid-plugins', FormBuilder.grid.Plugins);

FormBuilder.window.CreatePlugin = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.plugin_create'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/plugins/create'
        },
        bodyStyle   : 'padding: 0',
        fields      : [{
            xtype       : 'modx-vtabs',
            deferredRender : false,
            hideMode    : 'offsets',
            items       : [{
                title       : _('formbuilder.plugin_settings'),
                defaults    : {
                    layout      : 'form',
                    labelSeparator : ''
                },
                items       : [{
                    layout      : 'column',
                    defaults    : {
                        layout      : 'form',
                        labelSeparator : ''
                    },
                    items       : [{
                        columnWidth : .85,
                        items       : [{
                            xtype       : 'textfield',
                            fieldLabel  : _('formbuilder.label_plugin_name'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_name_desc'),
                            name        : 'name',
                            anchor      : '100%',
                            allowBlank  : false
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_plugin_name_desc'),
                            cls         : 'desc-under'
                        }]
                    }, {
                        columnWidth : .15,
                        items       : [{
                            xtype       : 'checkbox',
                            fieldLabel  : _('formbuilder.label_plugin_active'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_active_desc'),
                            name        : 'active',
                            inputValue  : 1,
                            checked     : true
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_plugin_active_desc'),
                            cls         : 'desc-under'
                        }]
                    }]
                }, {
                    xtype       : 'textarea',
                    fieldLabel  : _('formbuilder.label_plugin_description'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_description_desc'),
                    name        : 'description',
                    anchor      : '100%',
                    allowBlank  : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_plugin_description_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_plugin_snippet'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_snippet_desc'),
                    name        : 'snippet',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_plugin_snippet_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                title       : _('formbuilder.plugin_properties'),
                defaults    : {
                    layout      : 'form',
                    labelSeparator : ''
                },
                items       : [{
                    xtype       : 'hidden',
                    id          : 'formbuilder-plugin-properties-create',
                    name        : 'properties'
                }, {
                    xtype       : 'formbuilder-grid-plugin-properties',
                    preventRender : true,
                    listeners   : {
                        change      : {
                            fn          : this.onUpdatePluginProperties,
                            scope       : this
                        }
                    }
                }]
            }]
        }]
    });

    FormBuilder.window.CreatePlugin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreatePlugin, MODx.Window, {
    onUpdatePluginProperties: function(grid, data) {
        var tf = Ext.getCmp('formbuilder-plugin-properties-create');

        if (tf) {
            tf.setValue(Ext.encode(data));
        }
    }
});

Ext.reg('formbuilder-window-plugin-create', FormBuilder.window.CreatePlugin);

FormBuilder.window.UpdatePlugin = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.plugin_update'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/plugins/update'
        },
        bodyStyle   : 'padding: 0',
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'modx-vtabs',
            deferredRender : false,
            hideMode    : 'offsets',
            items       : [{
                title       : _('formbuilder.plugin_settings'),
                defaults    : {
                    layout      : 'form',
                    labelSeparator : ''
                },
                items       : [{
                    layout      : 'column',
                    defaults    : {
                        layout      : 'form',
                        labelSeparator : ''
                    },
                    items       : [{
                        columnWidth : .85,
                        items       : [{
                            xtype       : 'textfield',
                            fieldLabel  : _('formbuilder.label_plugin_name'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_name_desc'),
                            name        : 'name',
                            anchor      : '100%',
                            allowBlank  : false
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_plugin_name_desc'),
                            cls         : 'desc-under'
                        }]
                    }, {
                        columnWidth : .15,
                        items       : [{
                            xtype       : 'checkbox',
                            fieldLabel  : _('formbuilder.label_plugin_active'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_active_desc'),
                            name        : 'active',
                            inputValue  : 1,
                            checked     : true
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_plugin_active_desc'),
                            cls         : 'desc-under'
                        }]
                    }]
                }, {
                    xtype       : 'textarea',
                    fieldLabel  : _('formbuilder.label_plugin_description'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_description_desc'),
                    name        : 'description',
                    anchor      : '100%',
                    allowBlank  : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_plugin_description_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_plugin_snippet'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_plugin_snippet_desc'),
                    name        : 'snippet',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_plugin_snippet_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                title       : _('formbuilder.plugin_properties'),
                defaults    : {
                    layout      : 'form',
                    labelSeparator : ''
                },
                items       : [{
                    xtype       : 'hidden',
                    id          : 'formbuilder-plugin-properties-update',
                    name        : 'properties'
                }, {
                    xtype       : 'formbuilder-grid-plugin-properties',
                    preventRender : true,
                    values      : config.record.properties,
                    listeners   : {
                        change      : {
                            fn          : this.onUpdatePluginProperties,
                            scope       : this
                        }
                    }
                }]
            }]
        }]
    });

    FormBuilder.window.UpdatePlugin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdatePlugin, MODx.Window, {
    onUpdatePluginProperties: function(grid, data) {
        var tf = Ext.getCmp('formbuilder-plugin-properties-update');

        if (tf) {
            tf.setValue(Ext.encode(data));
        }
    }
});

Ext.reg('formbuilder-window-plugin-update', FormBuilder.window.UpdatePlugin);