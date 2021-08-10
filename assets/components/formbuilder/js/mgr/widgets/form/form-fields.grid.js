FormBuilder.grid.FormFields = function(config) {
    config = config || {};

    var columns = new Ext.grid.ColumnModel({
        columns     : [{
            header      : _('formbuilder.label_form_field_label'),
            dataIndex   : 'label_formatted',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_form_field_type'),
            dataIndex   : 'field_type_name',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderFieldType
        }, {
            header      : _('formbuilder.label_form_field_active'),
            dataIndex   : 'active',
            sortable    : true,
            editable    : false,
            width       : 100,
            fixed       : true,
            renderer    : this.renderBoolean
        }]
    });
    
    Ext.applyIf(config, {
        cm          : columns,
        id          : 'formbuilder-grid-form-fields',
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/fields/getlist',
            form_id     : config.form_id
        },
        autosave    : true,
        save_action : 'mgr/forms/fields/updatefromgrid',
        fields      : ['id', 'form_id', 'field_type_id', 'key', 'label', 'description', 'placeholder', 'values', 'required', 'validate', 'menuindex', 'active', 'editedon', 'field_type_name', 'field_type_icon', 'label_formatted'],
        paging      : false,
        enableDragDrop : true,
        ddGroup     : 'formbuilder-grid-form-fields'
    });

    FormBuilder.grid.FormFields.superclass.constructor.call(this, config);

    this.on('afterrender', this.sortFormFields, this);
};

Ext.extend(FormBuilder.grid.FormFields, MODx.grid.Grid, {
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.form_field_update'),
            handler : this.updateFormField,
            scope   : this
        }, {
            text    : '<i class="x-menu-item-icon icon icon-copy"></i>' + _('formbuilder.form_field_duplicate'),
            handler : this.duplicateFormField,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.form_field_remove'),
            handler : this.removeFormField,
            scope   : this
         }];
    },
    sortFormFields: function() {
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
                            action      : 'mgr/forms/fields/sort',
                            sort        : order.join(',')
                        },
                        listeners   : {
                            'success'   : {
                                fn          : this.refresh,
                                scope       : this
                            }
                        }
                    });
                }
            }
        });
    },
    addFormField: function(btn, e, record) {
        MODx.Ajax.request({
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/fields/add',
                form_id     : this.form_id,
                field_type_id : record.id
            },
            listeners   : {
                'success'   : {
                    fn          : function(data) {
                        this.refresh();

                        if (data.object) {
                            this.updateFormField(btn, e, data.object);
                        }
                    },
                    scope       : this
                }
            }
        });
    },
    updateFormField: function(btn, e, record) {
        if (this.updateFormFieldWindow) {
            this.updateFormFieldWindow.destroy();
        }

        this.updateFormFieldWindow = MODx.load({
            xtype       : 'formbuilder-window-form-field-update',
            record      : record || this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.updateFormFieldWindow.setValues(record || this.menu.record);
        this.updateFormFieldWindow.show(e.target);
    },
    duplicateFormField: function(btn, e) {
        if (this.duplicateFormFieldWindow) {
            this.duplicateFormFieldWindow.destroy();
        }

        var record = Ext.applyIf({
            key : _('formbuilder.copy_of', {
                key : this.menu.record.key
            }).toLowerCase().replace(' ', '_'),
            label : _('formbuilder.copy_of', {
                key : this.menu.record.label
            })
        }, this.menu.record);

        this.duplicateFormFieldWindow = MODx.load({
            xtype       : 'formbuilder-window-form-field-duplicate',
            record      : record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.duplicateFormFieldWindow.setValues(record);
        this.duplicateFormFieldWindow.show(e.target);
    },
    removeFormField: function(btn, e) {
        MODx.msg.confirm({
            title       : _('formbuilder.form_field_remove'),
            text        : _('formbuilder.form_field_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/fields/remove',
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
    renderFieldType: function(d, c, e) {
        return '<i class="icon icon-' + e.json.field_type_icon + '"></i>' + d;
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

Ext.reg('formbuilder-grid-form-fields', FormBuilder.grid.FormFields);

FormBuilder.window.UpdateFormField = function(config) {
    config = config || {};

    var field   = FormBuilder.getField(config.record.field_type_id);
    var values  = [];

    if (parseInt(field.values) === 1) {
        values.push({
            xtype       : 'hidden',
            id          : 'formbuilder-form-field-values',
            name        : 'values'
        }, {
            xtype       : 'formbuilder-grid-form-field-values',
            preventRender : true,
            values      : config.record.values,
            listeners   : {
                change      : {
                    fn          : this.onUpdateFieldValues,
                    scope       : this
                }
            }
        });
    } else {
        values.push({
            html    : '<p>' + _('formbuilder.form_field_values_not_allowed') + '</p>',
            cls     : 'modx-config-error'
        });
    }

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('formbuilder.form_field_update'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/fields/update'
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
                title       : _('formbuilder.form_field_settings'),
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
                            fieldLabel  : _('formbuilder.label_form_field_label'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_label_desc'),
                            name        : 'label',
                            anchor      : '100%',
                            allowBlank  : false
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_field_label_desc'),
                            cls         : 'desc-under'
                        }]
                    }, {
                        columnWidth : .15,
                        items       : [{
                            xtype       : 'checkbox',
                            fieldLabel  : _('formbuilder.label_form_field_active'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_active_desc'),
                            name        : 'active',
                            inputValue  : 1,
                            checked     : true
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_field_active_desc'),
                            cls         : 'desc-under'
                        }]
                    }]
                }, {
                    xtype       : field.fields.indexOf('key') !== -1 ? 'textfield' : 'hidden',
                    fieldLabel  : _('formbuilder.label_form_field_key'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_key_desc'),
                    name        : 'key',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp && field.fields.indexOf('key') !== -1 ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_key_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : field.fields.indexOf('description') !== -1 ? 'textarea' : 'hidden',
                    fieldLabel  : _('formbuilder.label_form_field_description'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_description_desc'),
                    name        : 'description',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp && field.fields.indexOf('description') !== -1 ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_description_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : field.fields.indexOf('placeholder') !== -1 ? 'textfield' : 'hidden',
                    fieldLabel  : _('formbuilder.label_form_field_placeholder'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_placeholder_desc'),
                    name        : 'placeholder',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp && field.fields.indexOf('placeholder') !== -1 ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_placeholder_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : field.fields.indexOf('required') !== -1 ? 'checkbox' : 'hidden',
                    hideLabel   : true,
                    boxLabel    : _('formbuilder.label_form_field_required_desc'),
                    name        : 'required',
                    anchor      : '100%',
                    inputValue  : 1
                }, {
                    xtype       : field.fields.indexOf('validate') !== -1 ? 'textfield' : 'hidden',
                    fieldLabel  : _('formbuilder.label_form_field_validate'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_validate_desc'),
                    name        : 'validate',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp && field.fields.indexOf('validate') !== -1 ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_validate_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                title       : _('formbuilder.form_field_values'),
                items       : values
            }]
        }]
    });

    FormBuilder.window.UpdateFormField.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateFormField, MODx.Window, {
    onUpdateFieldValues: function(grid, data) {
        var tf = Ext.getCmp('formbuilder-form-field-values');

        if (tf) {
            tf.setValue(Ext.encode(data));
        }
    }
});

Ext.reg('formbuilder-window-form-field-update', FormBuilder.window.UpdateFormField);

FormBuilder.window.DuplicateFormField = function(config) {
    config = config || {};

    var field = FormBuilder.getField(config.record.field_type_id);

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.form_field_duplicate'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/fields/add'
        },
        fields      : [{
            xtype       : 'hidden',
            name        : 'form_id'
        }, {
            xtype       : 'hidden',
            name        : 'field_type_id'
        }, {
            xtype       : 'hidden',
            name        : 'description'
        }, {
            xtype       : 'hidden',
            name        : 'placeholder'
        }, {
            xtype       : 'hidden',
            name        : 'values'
        }, {
            xtype       : 'hidden',
            name        : 'required'
        }, {
            xtype       : 'hidden',
            name        : 'validate'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('formbuilder.label_form_field_label'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_label_desc'),
            name        : 'label',
            anchor      : '100%',
            allowBlank  : false
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_field_label_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : field.fields.indexOf('key') !== -1 ? 'textfield' : 'hidden',
            fieldLabel  : _('formbuilder.label_form_field_key'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_key_desc'),
            name        : 'key',
            anchor      : '100%',
            allowBlank  : false
        }, {
            xtype       : MODx.expandHelp && field.fields.indexOf('key') !== -1 ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_field_key_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.DuplicateFormField.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.DuplicateFormField, MODx.Window);

Ext.reg('formbuilder-window-form-field-duplicate', FormBuilder.window.DuplicateFormField);