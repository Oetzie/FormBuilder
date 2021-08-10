FormBuilder.grid.FormPlugins = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.form_plugin_create'),
        cls         : 'primary-button',
        handler     : this.createFormPlugin,
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'formbuilder-filter-form-plugins-search',
        id          : 'formbuilder-filter-form-plugins-search',
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
        id          : 'formbuilder-filter-form-plugins-clear',
        text        : _('filter_clear'),
        listeners   : {
            'click'     : {
                fn          : this.clearFilter,
                scope       : this
            }
        }
    }];

    var expander = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p class="desc">{plugin_description}</p>'
        )
    });

    var columns = new Ext.grid.ColumnModel({
        columns     : [expander, {
            header      : _('formbuilder.label_form_plugin_plugin'),
            dataIndex   : 'plugin_name',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_form_plugin_active'),
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
        id          : 'formbuilder-grid-form-plugins',
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/plugins/getlist',
            form_id     : config.form_id
        },
        fields      : ['id', 'form_id', 'plugin_id', 'properties', 'menuindex', 'active', 'editedon', 'plugin_name', 'plugin_description'],
        paging      : true,
        pageSize    : MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30,
        sortBy      : 'plugin_name',
        plugins     : expander,
        enableDragDrop : true,
        ddGroup     : 'formbuilder-grid-form-plugins'
    });

    FormBuilder.grid.FormPlugins.superclass.constructor.call(this, config);

    this.on('afterrender', this.sortFormPlugins, this);
};

Ext.extend(FormBuilder.grid.FormPlugins, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();

        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('formbuilder-filter-form-plugins-search').reset();

        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.form_plugin_update'),
            handler : this.updateFormPlugin,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.form_plugin_remove'),
            handler : this.removeFormPlugin,
            scope   : this
         }];
    },
    sortFormPlugins: function() {
        new Ext.dd.DropTarget(this.getView().mainBody, {
            ddGroup     : this.config.ddGroup,
            notifyDrop  : function(dd, e, data) {
                var index = dd.getDragData(e).rowIndex;

                if (undefined !== index) {
                    for (var i = 0; i < data.selections.length; i++) {
                        data.grid.getStore().remove(data.grid.getStore().getById(data.selections[i].id));
                        data.grid.getStore().insert(index, data.selections[i]);
                    }

                    var order = [];

                    Ext.each(data.grid.getStore().data.items, (function(record) {
                        order.push(record.id);
                    }).bind(this));

                    MODx.Ajax.request({
                        url         : FormBuilder.config.connector_url,
                        params      : {
                            action      : 'mgr/forms/plugins/sort',
                            sort        : order.join(',')
                        },
                        listeners   : {
                            'success'   : {
                                fn          : function() {

                                },
                                scope       : this
                            }
                        }
                    });
                }
            }
        });
    },
    createFormPlugin: function(btn, e) {
        if (this.createFormPluginWindow) {
            this.createFormPluginWindow.destroy();
        }

        this.createFormPluginWindow = MODx.load({
            xtype       : 'formbuilder-window-form-plugin-create',
            record      : {
                form_id     : this.form_id
            },
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.createFormPluginWindow.setValues({
            form_id : this.form_id
        });
        this.createFormPluginWindow.show(e.target);
    },
    updateFormPlugin: function(btn, e) {
        if (this.updateFormPluginWindow) {
            this.updateFormPluginWindow.destroy();
        }

        this.updateFormPluginWindow = MODx.load({
            xtype       : 'formbuilder-window-form-plugin-update',
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.updateFormPluginWindow.setValues(this.menu.record);
        this.updateFormPluginWindow.show(e.target);
    },
    removeFormPlugin: function(btn, e) {
        MODx.msg.confirm({
            title       : _('formbuilder.form_plugin_remove'),
            text        : _('formbuilder.form_plugin_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/plugins/remove',
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

Ext.reg('formbuilder-grid-form-plugins', FormBuilder.grid.FormPlugins);

FormBuilder.window.CreateFormPlugin = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.form_plugin_create'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/plugins/create'
        },
        fields      : [{
            xtype       : 'hidden',
            name        : 'form_id'
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .85,
                items       : [{
                    xtype       : 'formbuilder-combo-plugins',
                    fieldLabel  : _('formbuilder.label_form_plugin_plugin'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_plugin_plugin_desc'),
                    name        : 'plugin',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_plugin_plugin_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_form_plugin_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_plugin_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_plugin_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }]
    });

    FormBuilder.window.CreateFormPlugin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreateFormPlugin, MODx.Window);

Ext.reg('formbuilder-window-form-plugin-create', FormBuilder.window.CreateFormPlugin);

FormBuilder.window.UpdateFormPlugin = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.form_plugin_update'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/plugins/update'
        },
        bodyStyle   : 'padding: 0',
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'hidden',
            name        : 'form_id'
        }, {
            xtype       : 'modx-vtabs',
            deferredRender : false,
            hideMode    : 'offsets',
            items       : [{
                title       : _('formbuilder.form_plugin_settings'),
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
                            xtype       : 'formbuilder-combo-plugins',
                            fieldLabel  : _('formbuilder.label_form_plugin_plugin'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_plugin_plugin_desc'),
                            name        : 'plugin',
                            anchor      : '100%',
                            allowBlank  : false,
                            disabled    : true
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_plugin_plugin_desc'),
                            cls         : 'desc-under'
                        }]
                    }, {
                        columnWidth : .15,
                        items       : [{
                            xtype       : 'checkbox',
                            fieldLabel  : _('formbuilder.label_form_plugin_active'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_plugin_active_desc'),
                            name        : 'active',
                            inputValue  : 1,
                            checked     : true
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_plugin_active_desc'),
                            cls         : 'desc-under'
                        }]
                    }]
                }]
            }, {
                title       : _('formbuilder.form_plugin_properties'),
                defaults    : {
                    layout      : 'form',
                    labelSeparator : ''
                },
                items       : [{
                    xtype       : 'hidden',
                    id          : 'formbuilder-form-plugin-properties-update',
                    name        : 'properties'
                }, {
                    xtype       : 'formbuilder-grid-form-plugin-properties',
                    preventRender : true,
                    plugin      : config.record,
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

    FormBuilder.window.UpdateFormPlugin.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateFormPlugin, MODx.Window, {
    onUpdatePluginProperties: function(grid, data) {
        var tf = Ext.getCmp('formbuilder-form-plugin-properties-update');

        if (tf) {
            tf.setValue(Ext.encode(data));
        }
    }
});

Ext.reg('formbuilder-window-form-plugin-update', FormBuilder.window.UpdateFormPlugin);