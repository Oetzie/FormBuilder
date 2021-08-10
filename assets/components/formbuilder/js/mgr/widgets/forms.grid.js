FormBuilder.grid.Forms = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('formbuilder.form_create'),
        cls         : 'primary-button',
        handler     : this.createForm,
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'formbuilder-filter-forms-search',
        id          : 'formbuilder-filter-forms-search',
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
        id          : 'formbuilder-filter-forms-clear',
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
            header      : _('formbuilder.label_form_name'),
            dataIndex   : 'name',
            sortable    : true,
            editable    : false,
            width       : 200
        }, {
            header      : _('formbuilder.label_form_email'),
            dataIndex   : 'email',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderEmail
        }, {
            header      : _('formbuilder.label_form_save'),
            dataIndex   : 'save',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderBoolean
        }, {
            header      : _('formbuilder.label_form_active'),
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
        id          : 'formbuilder-grid-forms',
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/getlist'
        },
        fields      : ['id', 'name', 'active', 'active_from', 'active_till', 'save', 'email', 'email_to', 'email_from', 'email_subject', 'email_attachment', 'email_content', 'editedon'],
        paging      : true,
        pageSize    : MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30,
        sortBy      : 'id'
    });

    FormBuilder.grid.Forms.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.grid.Forms, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();

        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('formbuilder-filter-forms-search').reset();

        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('formbuilder.form_update'),
            handler : this.updateForm,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-cogs"></i>' + _('formbuilder.form_manage'),
            handler : this.manageForm,
            scope   : this
        }, {
            text    : '<i class="x-menu-item-icon icon icon-search"></i>' + _('formbuilder.view_forms'),
            handler : this.viewForms,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('formbuilder.form_remove'),
            handler : this.removeForm,
            scope   : this
         }];
    },
    createForm: function(btn, e) {
        if (this.createFormWindow) {
            this.createFormWindow.destroy();
        }

        this.createFormWindow = MODx.load({
            xtype       : 'formbuilder-window-form-create',
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.createFormWindow.show(e.target);
    },
    updateForm: function(btn, e) {
        if (this.updateFormWindow) {
            this.updateFormWindow.destroy();
        }

        this.updateFormWindow = MODx.load({
            xtype       : 'formbuilder-window-form-update',
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.updateFormWindow.setValues(this.menu.record);
        this.updateFormWindow.show(e.target);
    },
    manageForm: function(btn, e) {
        MODx.loadPage('?a=form/manage&namespace=' + MODx.request.namespace + '&id=' + this.menu.record.id);
    },
    viewForms: function(btn, e) {
        MODx.loadPage('?a=home&namespace=form&formbuilder=' + encodeURIComponent(this.menu.record.id));
    },
    removeForm: function(btn, e) {
        MODx.msg.confirm({
            title       : _('formbuilder.form_remove'),
            text        : _('formbuilder.form_remove_confirm'),
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/remove',
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
    renderEmail: function(d, c, e) {
        if (parseInt(d) === 1 || d) {
            return e.json.email_to;
        }

        c.css = 'red';

        return _('no');
    },
    renderSave: function(d, c, e) {
        if (parseInt(d) === 1 || d) {
            return '<a href="?a=home&namespace=form&formbuilder=' + encodeURIComponent(e.json.id) + '" title="' + _('formbuilder.view_forms') + '">' + _('formbuilder.view_forms') + '</a>';
        }

        c.css = 'red';

        return _('no');
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

Ext.reg('formbuilder-grid-forms', FormBuilder.grid.Forms);

FormBuilder.window.CreateForm = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.form_create'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/create'
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
                    fieldLabel  : _('formbuilder.label_form_name'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_name_desc'),
                    name        : 'name',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_name_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_form_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'xdatetime',
            fieldLabel  : _('formbuilder.label_form_active_from'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_from_desc'),
            name        : 'active_from',
            anchor      : '100%',
            dateFormat  : MODx.config.manager_date_format,
            timeFormat  : MODx.config.manager_time_format,
            startDay    : parseInt(MODx.config.manager_week_start),
            offset_time : MODx.config.server_offset_time
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_active_from_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'xdatetime',
            fieldLabel  : _('formbuilder.label_form_active_till'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_till_desc'),
            name        : 'active_till',
            anchor      : '100%',
            dateFormat  : MODx.config.manager_date_format,
            timeFormat  : MODx.config.manager_time_format,
            startDay    : parseInt(MODx.config.manager_week_start),
            offset_time : MODx.config.server_offset_time
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_active_till_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.CreateForm.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.CreateForm, MODx.Window);

Ext.reg('formbuilder-window-form-create', FormBuilder.window.CreateForm);

FormBuilder.window.UpdateForm = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('formbuilder.form_update'),
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/update'
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
                    fieldLabel  : _('formbuilder.label_form_name'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_name_desc'),
                    name        : 'name',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_name_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .15,
                items       : [{
                    xtype       : 'checkbox',
                    fieldLabel  : _('formbuilder.label_form_active'),
                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_desc'),
                    name        : 'active',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('formbuilder.label_form_active_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }, {
            xtype       : 'xdatetime',
            fieldLabel  : _('formbuilder.label_form_active_from'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_from_desc'),
            name        : 'active_from',
            anchor      : '100%',
            dateFormat  : MODx.config.manager_date_format,
            timeFormat  : MODx.config.manager_time_format,
            startDay    : parseInt(MODx.config.manager_week_start),
            offset_time : MODx.config.server_offset_time
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_active_from_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'xdatetime',
            fieldLabel  : _('formbuilder.label_form_active_till'),
            description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_till_desc'),
            name        : 'active_till',
            anchor      : '100%',
            dateFormat  : MODx.config.manager_date_format,
            timeFormat  : MODx.config.manager_time_format,
            startDay    : parseInt(MODx.config.manager_week_start),
            offset_time : MODx.config.server_offset_time
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('formbuilder.label_form_active_till_desc'),
            cls         : 'desc-under'
        }]
    });

    FormBuilder.window.UpdateForm.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.window.UpdateForm, MODx.Window);

Ext.reg('formbuilder-window-form-update', FormBuilder.window.UpdateForm);