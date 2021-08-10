FormBuilder.grid.FormFieldValues = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.field_value_create'),
        cls         : 'primary-button',
        handler     : this.createFieldValue,
        scope       : this
    }];

    var columns = new Ext.grid.ColumnModel({
        columns     : [{
            header      : _('formbuilder.label_form_field_value_label'),
            dataIndex   : 'value',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_form_field_value_active'),
            dataIndex   : 'active',
            sortable    : true,
            editable    : false,
            width       : 100,
            fixed       : true,
            renderer    : this.renderBoolean
        }]
    });
    
    Ext.applyIf(config, {
        autoHeight  : true,
        cm          : columns,
        id          : 'formbuilder-grid-form-field-values',
        fields      : ['id', 'value', 'active', 'selected', 'index'],
        store       : new Ext.data.JsonStore({
            fields      : ['id', 'value', 'active', 'selected', 'index'],
            data        : Ext.decode(config.values) || [],
            remoteSort  : false
        }),
        paging      : false,
        enableDragDrop : true,
        ddGroup     : 'formbuilder-grid-form-field-values'
    });

    FormBuilder.grid.FormFieldValues.superclass.constructor.call(this, config);

    this.on('afterrender', this.sortFieldValues, this);
};

Ext.extend(FormBuilder.grid.FormFieldValues, MODx.grid.LocalGrid, {
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.field_value_update'),
            handler : this.updateFieldValue,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.field_value_remove'),
            handler : this.removeFieldValue,
            scope   : this
         }];
    },
    sortFieldValues: function() {
        new Ext.dd.DropTarget(this.getView().mainBody, {
            ddGroup     : this.config.ddGroup,
            notifyDrop  : (function(dd, e, data) {
                var index = dd.getDragData(e).rowIndex;

                if (undefined !== index) {
                    for (var i = 0; i < data.selections.length; i++) {
                        data.grid.getStore().remove(data.grid.getStore().getById(data.selections[i].id));
                        data.grid.getStore().insert(index, data.selections[i]);
                    }

                    this.onUpdateStore({}, 'sort');
                }
            }).bind(this)
        });
    },
    createFieldValue: function(btn, e) {
        if (this.createValueWindow) {
            this.createValueWindow.destroy();
        }

        this.createValueWindow = MODx.load({
            xtype       : 'formbuilder-window-form-field-value-create',
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

        this.createValueWindow.show(e.target);
    },
    updateFieldValue: function(btn, e) {
        if (this.updateValueWindow) {
            this.updateValueWindow.destroy();
        }

        this.updateValueWindow = MODx.load({
            xtype       : 'formbuilder-window-form-field-value-update',
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

        this.updateValueWindow.setValues(this.menu.record);
        this.updateValueWindow.show(e.target);
    },
    removeFieldValue: function(btn, e) {
        Ext.MessageBox.confirm(_('formbuilder.field_value_remove'), _('formbuilder.field_value_remove_confirm'), function(event) {
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
                    value       : item.data.value || '',
                    active      : parseInt(item.data.active || '0'),
                    selected    : parseInt(item.data.selected || '0'),
                    index       : index
                };
            });

            if (method === 'create') {
                items[record.id] = {
                    id          : record.id,
                    value       : record.value || '',
                    active      : record.active || '0',
                    selected    : record.selected || '0',
                    index       : Object.keys(items).length
                };
            } else if (method === 'update') {
                items[record.id] = {
                    id          : record.id,
                    value       : record.value || '',
                    active      : record.active || '0',
                    selected    : record.selected || '0',
                    index       : record.index
                };
            } else if (method === 'remove') {
                items[record.id] = {
                    id          : null
                };
            }

            Ext.iterate(items, function(index, item) {
                if (item.id !== null) {
                    data.push({
                        id          : item.id,
                        value       : item.value,
                        active      : parseInt(item.active),
                        selected    : parseInt(item.selected),
                        index       : data.length
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

Ext.reg('formbuilder-grid-form-field-values', FormBuilder.grid.FormFieldValues);

FormBuilder.window.CreateFormFieldValue = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.field_value_create'),
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
                    fieldLabel  : _('formbuilder.label_form_field_value_label'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_value_label_desc'),
                    name        : 'value',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_value_label_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_form_field_value_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_value_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_value_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'checkbox',
            boxLabel    : _('formbuilder.label_form_field_value_selected_desc'),
            name        : 'selected',
            inputValue  : 1
        }]
    });

    FormBuilder.window.CreateFormFieldValue.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreateFormFieldValue, MODx.Window, {
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

Ext.reg('formbuilder-window-form-field-value-create', FormBuilder.window.CreateFormFieldValue);

FormBuilder.window.UpdateFormFieldValue = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.field_value_update'),
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
                    fieldLabel  : _('formbuilder.label_form_field_value_label'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_value_label_desc'),
                    name        : 'value',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_value_label_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_form_field_value_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_field_value_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_field_value_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'checkbox',
            boxLabel    : _('formbuilder.label_form_field_value_selected_desc'),
            name        : 'selected',
            inputValue  : 1
        }]
    });

    FormBuilder.window.UpdateFormFieldValue.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateFormFieldValue, MODx.Window, {
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

Ext.reg('formbuilder-window-form-field-value-update', FormBuilder.window.UpdateFormFieldValue);