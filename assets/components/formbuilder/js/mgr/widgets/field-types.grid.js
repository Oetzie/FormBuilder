FormBuilder.grid.FieldTypes = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.field_type_create'),
        cls         : 'primary-button',
        handler     : this.createFieldType,
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'formbuilder-filter-field-types-search',
        id          : 'formbuilder-filter-field-types-search',
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
        id          : 'formbuilder-filter-field-types-clear',
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
            header      : _('formbuilder.label_field_type_name'),
            dataIndex   : 'name_formatted',
            sortable    : true,
            editable    : false,
            width       : 200,
            renderer    : this.renderName
        }, {
            header      : _('formbuilder.label_field_type_validate'),
            dataIndex   : 'validate',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderValidate
        }, {
            header      : _('formbuilder.label_field_type_active'),
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
            width       : 200,
            fixed       : true,
            renderer    : this.renderDate
        }]
    });
    
    Ext.applyIf(config, {
        cm          : columns,
        id          : 'formbuilder-grid-field-types',
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/fieldtypes/getlist'
        },
        fields      : ['id', 'type', 'name', 'values', 'tpl', 'tpl_values', 'icon', 'fields', 'validate', 'plugin_id', 'menuindex', 'active', 'editedon', 'name_formatted'],
        paging      : true,
        pageSize    : MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30,
        enableDragDrop : true,
        ddGroup     : 'formbuilder-grid-field-types'
    });

    FormBuilder.grid.FieldTypes.superclass.constructor.call(this, config);

    this.on('afterrender', this.sortFieldTypes, this);
};

Ext.extend(FormBuilder.grid.FieldTypes, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();

        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('formbuilder-filter-field-types-search').reset();

        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.field_type_update'),
            handler : this.updateFieldType,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.field_type_remove'),
            handler : this.removeFieldType,
            scope   : this
         }];
    },
    sortFieldTypes: function() {
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
                            action      : 'mgr/fieldtypes/sort',
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
    createFieldType: function(btn, e) {
        if (this.createFieldTypeWindow) {
            this.createFieldTypeWindow.destroy();
        }

        this.createFieldTypeWindow = MODx.load({
            xtype       : 'formbuilder-window-field-type-create',
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.createFieldTypeWindow.show(e.target);
    },
    updateFieldType: function(btn, e) {
        if (this.updateFieldTypeWindow) {
            this.updateFieldTypeWindow.destroy();
        }

        this.updateFieldTypeWindow = MODx.load({
            xtype       : 'formbuilder-window-field-type-update',
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.updateFieldTypeWindow.setValues(this.menu.record);
        this.updateFieldTypeWindow.show(e.target);
    },
    removeFieldType: function(btn, e) {
        MODx.msg.confirm({
            title       : _('formbuilder.field_type_remove'),
            text        : _('formbuilder.field_type_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/fieldtypes/remove',
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
    renderName: function(d, c, e) {
        return '<i class="icon icon-' + e.json.icon + '"></i>' + d;
    },
    renderValidate: function(d, c, e) {
        var data = [];
        var validate = Ext.decode(d);

        if (validate) {
            Ext.iterate(validate, function(index, value) {
                if (typeof value === 'string') {
                    data.push(index + ' <em>(' + value + ')</em>');
                } else {
                    data.push(index);
                }
            });
        }

        return data.join(', ');
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

Ext.reg('formbuilder-grid-field-types', FormBuilder.grid.FieldTypes);

FormBuilder.window.CreateFieldType = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.field_type_create'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/fieldtypes/create'
        },
        fields      : [{
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .85,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_name'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_name_desc'),
                    name        : 'name',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_name_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_field_type_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'formbuilder-combo-field-type',
                    fieldLabel  : _('formbuilder.label_field_type_type'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_type_desc'),
                    name        : 'type',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_type_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'formbuilder-combo-plugins',
                    fieldLabel  : _('formbuilder.label_form_field_type_plugin'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_type_plugin_desc'),
                    name        : 'plugin',
                    anchor      : '100%',
                    emptyValue  : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_type_plugin_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_tpl'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_tpl_desc'),
                    name        : 'tpl',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_tpl_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_icon'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_icon_desc'),
                    name        : 'icon',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_icon_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'checkbox',
            hideLabel   : true,
            boxLabel    : _('formbuilder.label_field_type_values_desc'),
            name        : 'values',
            anchor      : '100%',
            inputValue  : 1,
            listeners   : {
                'check'     : {
                    fn          : this.onHandleValues,
                    scope       : this
                },
                'afterrender' : {
                    fn          : this.onHandleValues,
                    scope       : this
                }
            }
        }, {
            id          : 'formbuilder-field-type-create-values-tpl',
            layout      : 'form',
            labelSeparator : '',
            hidden      : true,
            items       : [{
                xtype       : 'textfield',
                fieldLabel  : _('formbuilder.label_field_type_tpl_values'),
                description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_tpl_values_desc'),
                name        : 'tpl_values',
                anchor      : '100%'
            }, {
                xtype       : MODx.expandHelp ? 'label' : 'hidden',
                html        : _('formbuilder.label_field_type_tpl_values_desc'),
                cls         : 'desc-under'
            }]
        }, {
            xtype       : 'checkboxgroup',
            fieldLabel  : _('formbuilder.label_field_type_fields'),
            columns     : 3,
            items       : [{
                boxLabel    : _('formbuilder.label_form_field_key'),
                name        : 'fields[]',
                inputValue  : 'key',
                checked     : config.record && config.record.fields.indexOf('key') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_description'),
                name        : 'fields[]',
                inputValue  : 'description',
                checked     : config.record && config.record.fields.indexOf('description') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_placeholder'),
                name        : 'fields[]',
                inputValue  : 'placeholder',
                checked     : config.record && config.record.fields.indexOf('placeholder') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_required'),
                name        : 'fields[]',
                inputValue  : 'required',
                checked     : config.record && config.record.fields.indexOf('required') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_validate'),
                name        : 'fields[]',
                inputValue  : 'validate',
                checked     : config.record && config.record.fields.indexOf('validate') !== -1
            }]
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_field_type_validate'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_validate_desc'),
            name        : 'validate',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_field_type_validate_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.CreateFieldType.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreateFieldType, MODx.Window, {
    onHandleValues: function(tf) {
        var tpl = Ext.getCmp('formbuilder-field-type-create-values-tpl');

        if (tpl) {
            if (tf.getValue()) {
                tpl.show();
            } else {
                tpl.hide();
            }
        }
    }
});

Ext.reg('formbuilder-window-field-type-create', FormBuilder.window.CreateFieldType);

FormBuilder.window.UpdateFieldType = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.field_type_update'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/fieldtypes/update'
        },
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .85,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_name'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_name_desc'),
                    name        : 'name',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_name_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_field_type_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'formbuilder-combo-field-type',
                    fieldLabel  : _('formbuilder.label_field_type_type'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_type_desc'),
                    name        : 'type',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_type_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'formbuilder-combo-plugins',
                    fieldLabel  : _('formbuilder.label_form_field_type_plugin'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_type_plugin_desc'),
                    name        : 'plugin',
                    anchor      : '100%',
                    emptyValue  : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_type_plugin_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_tpl'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_tpl_desc'),
                    name        : 'tpl',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_tpl_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('formbuilder.label_field_type_icon'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_icon_desc'),
                    name        : 'icon',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_field_type_icon_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'checkbox',
            hideLabel   : true,
            boxLabel    : _('formbuilder.label_field_type_values_desc'),
            name        : 'values',
            anchor      : '100%',
            inputValue  : 1,
            listeners   : {
                'check'     : {
                    fn          : this.onHandleValues,
                    scope       : this
                },
                'afterrender' : {
                    fn          : this.onHandleValues,
                    scope       : this
                }
            }
        }, {
            id          : 'formbuilder-field-type-update-values-tpl',
            layout      : 'form',
            labelSeparator : '',
            hidden      : true,
            items       : [{
                xtype       : 'textfield',
                fieldLabel  : _('formbuilder.label_field_type_tpl_values'),
                description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_tpl_values_desc'),
                name        : 'tpl_values',
                anchor      : '100%'
            }, {
                xtype       : MODx.expandHelp ? 'label' : 'hidden',
                html        : _('formbuilder.label_field_type_tpl_values_desc'),
                cls         : 'desc-under'
            }]
        }, {
            xtype       : 'checkboxgroup',
            fieldLabel  : _('formbuilder.label_field_type_fields'),
            columns     : 3,
            items       : [{
                boxLabel    : _('formbuilder.label_form_field_key'),
                name        : 'fields[]',
                inputValue  : 'key',
                checked     : config.record && config.record.fields.indexOf('key') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_description'),
                name        : 'fields[]',
                inputValue  : 'description',
                checked     : config.record && config.record.fields.indexOf('description') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_placeholder'),
                name        : 'fields[]',
                inputValue  : 'placeholder',
                checked     : config.record && config.record.fields.indexOf('placeholder') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_required'),
                name        : 'fields[]',
                inputValue  : 'required',
                checked     : config.record && config.record.fields.indexOf('required') !== -1
            }, {
                boxLabel    : _('formbuilder.label_form_field_validate'),
                name        : 'fields[]',
                inputValue  : 'validate',
                checked     : config.record && config.record.fields.indexOf('validate') !== -1
            }]
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_field_type_validate'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_field_type_validate_desc'),
            name        : 'validate',
            anchor      : '100%'
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_field_type_validate_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.UpdateFieldType.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateFieldType, MODx.Window, {
    onHandleValues: function(tf) {
        var tpl = Ext.getCmp('formbuilder-field-type-update-values-tpl');

        if (tpl) {
            if (tf.getValue()) {
                tpl.show();
            } else {
                tpl.hide();
            }
        }
    }
});

Ext.reg('formbuilder-window-field-type-update', FormBuilder.window.UpdateFieldType);