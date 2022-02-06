FormBuilder.panel.Form = function(config) {
    config = config || {};

    Ext.apply(config, {
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/manage',
            id          : MODx.request.id
        },
        id          : 'formbuilder-panel-form',
        cls         : 'container',
        items       : [{
            html        : '<h2>' + _('formbuilder.form') + ': ' + config.record.name + '</h2>',
            id          : 'formbuilder-page-header',
            cls         : 'modx-page-header'
        }, {
            xtype       : 'modx-tabs',
            items       : [{
                title       : _('formbuilder.form_settings'),
                items       : [{
                    html        : '<p>' + _('formbuilder.form_settings_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    layout      : 'form',
                    cls         : 'main-wrapper',
                    labelAlign  : 'top',
                    labelSeparator : '',
                    items       : [{
                        xtype       : 'textfield',
                        fieldLabel  : _('formbuilder.label_form_name'),
                        description : MODx.expandHelp ? '' : _('formbuilder.label_form_name_desc'),
                        name        : 'name',
                        anchor      : '100%',
                        allowBlank  : false,
                        listeners   : {
                            'keyup'     : {
                                fn          : this.onUpdateTitle,
                                scope       : this
                            }
                        }
                    }, {
                        xtype       : MODx.expandHelp ? 'label' : 'hidden',
                        html        : _('formbuilder.label_form_name_desc'),
                        cls         : 'desc-under'
                    }, {
                        layout      : 'column',
                        defaults    : {
                            layout      : 'form',
                            labelSeparator : ''
                        },
                        items       : [{
                            columnWidth : .5,
                            items       : [{
                                xtype       : 'xdatetime',
                                fieldLabel  : _('formbuilder.label_form_active_from'),
                                description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_from_desc'),
                                name        : 'active_from',
                                anchor      : '100%',
                                dateFormat  : MODx.config.manager_date_format,
                                timeFormat  : MODx.config.manager_time_format,
                                startDay    : parseInt(MODx.config.manager_week_start),
                                offset_time : MODx.config.server_offset_time,
                                allowBlank  : true
                            }, {
                                xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                html        : _('formbuilder.label_form_active_from_desc'),
                                cls         : 'desc-under'
                            }, {
                                xtype       : 'formbuilder-combo-success-action',
                                fieldLabel  : _('formbuilder.label_form_success_action'),
                                description : MODx.expandHelp ? '' : _('formbuilder.label_form_success_action_desc'),
                                name        : 'success_action',
                                hiddenName  : 'success_action',
                                anchor      : '100%',
                                listeners   : {
                                    afterrender : {
                                        fn          : this.onHandleSuccessAction,
                                        scope       : this
                                    },
                                    change      : {
                                        fn          : this.onHandleSuccessAction,
                                        scope       : this
                                    }
                                }
                            }, {
                                xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                html        : _('formbuilder.label_form_success_action_desc'),
                                cls         : 'desc-under'
                            }, {
                                layout      : 'form',
                                labelSeparator : '',
                                id          : 'formbuilder-panel-form-success-action-resource',
                                hidden      : true,
                                items       : [{
                                    xtype       : 'hidden',
                                    name        : 'success_resource',
                                    id          : 'formbuilder-panel-form-success'
                                }, {
                                    xtype       : 'hidden',
                                    name        : 'success_context',
                                    id          : 'formbuilder-panel-form-success-context'
                                }, {
                                    xtype       : 'modx-field-parent-change',
                                    fieldLabel  : _('formbuilder.label_form_success_resource'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_success_resource_desc'),
                                    anchor      : '100%',
                                    name        : 'success_resource_formatted',
                                    allowBlank  : true,
                                    formpanel   : 'formbuilder-panel-form',
                                    parentcmp   : 'formbuilder-panel-form-success',
                                    contextcmp  : 'formbuilder-panel-form-success-context'
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_success_resource_desc'),
                                    cls         : 'desc-under'
                                }]
                            }, {
                                layout      : 'form',
                                labelSeparator : '',
                                id          : 'formbuilder-panel-form-success-action-message',
                                hidden      : true,
                                items       : [{
                                    xtype       : 'textarea',
                                    fieldLabel  : _('formbuilder.label_form_success_message'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_success_message_desc'),
                                    name        : 'success_message',
                                    anchor      : '100%',
                                    listeners   : {
                                        afterrender : {
                                            fn          : function(event) {
                                                if (MODx.loadRTE) {
                                                    MODx.loadRTE(event.id, FormBuilder.config.tinymce_config);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_success_message_desc'),
                                    cls         : 'desc-under'
                                }]
                            }]
                        }, {
                            columnWidth : .5,
                            items       : [{
                                xtype       : 'xdatetime',
                                fieldLabel  : _('formbuilder.label_form_active_till'),
                                description : MODx.expandHelp ? '' : _('formbuilder.label_form_active_till_desc'),
                                name        : 'active_till',
                                anchor      : '100%',
                                dateFormat  : MODx.config.manager_date_format,
                                timeFormat  : MODx.config.manager_time_format,
                                startDay    : parseInt(MODx.config.manager_week_start),
                                offset_time : MODx.config.server_offset_time,
                                allowBlank  : true
                            }, {
                                xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                html        : _('formbuilder.label_form_active_till_desc'),
                                cls         : 'desc-under'
                            }, {
                                xtype       : 'xcheckbox',
                                fieldLabel  : _('formbuilder.label_form_save'),
                                boxLabel    : _('formbuilder.label_form_save_desc'),
                                name        : 'save',
                                anchor      : '100%'
                            }]
                        }]
                    }]
                }]
            }, {
                title       : _('formbuilder.form_fields'),
                items       : [{
                    html        : '<p>' + _('formbuilder.form_fields_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    xtype       : 'panel',
                    cls         : 'main-wrapper x-formbuilder-form',
                    items       : [{
                        layout      : 'column',
                        defaults    : {
                            layout      : 'form',
                            labelSeparator : ''
                        },
                        items       : [{
                            columnWidth : .6,
                            items       : [{
                                html        : '<h3>' + _('formbuilder.form_fields') + '</h3>'
                            }, {
                                xtype       : 'formbuilder-grid-form-fields',
                                form_id     : config.record.id,
                                listeners   : {
                                    afterrender : {
                                        fn          : function(grid) {
                                            grid.getStore().on('load', this.onValidateForm, this);
                                        },
                                        scope       : this
                                    }
                                }
                            }]
                        }, {
                            columnWidth : .4,
                            items       : [{
                                html        : '<h3>' + _('formbuilder.form_add_field') + '</h3>'
                            }, {
                                xtype       : 'formbuilder-combo-field-types',
                                listeners   : {
                                    change      : {
                                        fn          : this.onCreateField,
                                        scope       : this
                                    }
                                }
                            }, {
                                cls         : 'modx-config-error panel-desc',
                                hidden      : true,
                                id          : 'formbuilder-panel-form-message',
                                listeners   : {
                                    afterrender : {
                                        fn          : this.onValidateForm,
                                        scope       : this
                                    }
                                }
                            }]
                        }]
                    }]
                }]
            }, {
                title       : _('formbuilder.form_email_settings'),
                items       : [{
                    html        : '<p>' + _('formbuilder.form_email_settings_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    layout      : 'form',
                    cls         : 'main-wrapper',
                    labelAlign  : 'top',
                    labelSeparator : '',
                    defaults    : {
                        layout      : 'form',
                        labelSeparator : ''
                    },
                    items       : [{
                        cls         : 'modx-config-info panel-desc',
                        id          : 'formbuilder-panel-form-placeholders',
                        hidden      : true,
                        listeners   : {
                            afterrender : {
                                fn          : this.onValidateForm,
                                scope       : this
                            }
                        }
                    }, {
                        xtype       : 'xcheckbox',
                        fieldLabel  : _('formbuilder.label_form_email'),
                        boxLabel    : _('formbuilder.label_form_email_desc'),
                        name        : 'email',
                        anchor      : '100%',
                        listeners   : {
                            check       : {
                                fn          : this.onHandleEmail,
                                scope       : this
                            }
                        }
                    }, {
                        layout      : 'form',
                        labelSeparator : '',
                        id          : 'formbuilder-panel-form-email',
                        hidden      : true,
                        items       : [{
                            layout      : 'column',
                            defaults    : {
                                layout      : 'form',
                                labelSeparator : ''
                            },
                            items       : [{
                                columnWidth : .5,
                                items       : [{
                                    xtype       : 'textfield',
                                    fieldLabel  : _('formbuilder.label_form_email_to'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_email_to_desc'),
                                    name        : 'email_to',
                                    anchor      : '100%'
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_email_to_desc'),
                                    cls         : 'desc-under'
                                }]
                            }, {
                                columnWidth : .5,
                                items       : [{
                                    xtype       : 'textfield',
                                    fieldLabel  : _('formbuilder.label_form_email_from'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_email_from_desc'),
                                    name        : 'email_from',
                                    anchor      : '100%',
                                    regex       : new RegExp(FormBuilder.config.email_regex)
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_email_from_desc'),
                                    cls         : 'desc-under'
                                }]
                            }]
                        }, {
                            xtype       : 'textfield',
                            fieldLabel  : _('formbuilder.label_form_email_subject'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_email_subject_desc'),
                            name        : 'email_subject',
                            anchor      : '100%'
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_email_subject_desc'),
                            cls         : 'desc-under'
                        }, {
                            xtype       : 'textarea',
                            fieldLabel  : _('formbuilder.label_form_email_content'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_email_content_desc'),
                            name        : 'email_content',
                            anchor      : '100%',
                            listeners   : {
                                afterrender : {
                                    fn          : function(event) {
                                        if (MODx.loadRTE) {
                                            MODx.loadRTE(event.id, FormBuilder.config.tinymce_config);
                                        }
                                    }
                                }
                            }
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_email_content_desc'),
                            cls         : 'desc-under'
                        }]
                    }, {
                        xtype       : 'xcheckbox',
                        fieldLabel  : _('formbuilder.label_form_reply_email'),
                        boxLabel    : _('formbuilder.label_form_reply_email_desc'),
                        name        : 'reply_email',
                        anchor      : '100%',
                        listeners   : {
                            check       : {
                                fn          : this.onHandleReplyEmail,
                                scope       : this
                            }
                        }
                    }, {
                        layout      : 'form',
                        labelSeparator : '',
                        id          : 'formbuilder-panel-form-reply-email',
                        hidden      : true,
                        items       : [{
                            layout      : 'column',
                            defaults    : {
                                layout      : 'form',
                                labelSeparator : ''
                            },
                            items       : [{
                                columnWidth : .5,
                                items       : [{
                                    xtype       : 'formbuilder-combo-fields',
                                    fieldLabel  : _('formbuilder.label_form_reply_email_to'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_reply_email_to_desc'),
                                    name        : 'reply_email_to',
                                    hiddenName  : 'reply_email_to',
                                    anchor      : '100%',
                                    form_id     : config.record.id,
                                    emailOnly   : true
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_reply_email_to_desc'),
                                    cls         : 'desc-under'
                                }]
                            }, {
                                columnWidth : .5,
                                items       : [{
                                    xtype       : 'textfield',
                                    fieldLabel  : _('formbuilder.label_form_reply_email_from'),
                                    description : MODx.expandHelp ? '' : _('formbuilder.label_form_reply_email_from_desc'),
                                    name        : 'reply_email_from',
                                    anchor      : '100%',
                                    regex       : new RegExp(FormBuilder.config.email_regex)
                                }, {
                                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                                    html        : _('formbuilder.label_form_reply_email_from_desc'),
                                    cls         : 'desc-under'
                                }]
                            }]
                        }, {
                            xtype       : 'textfield',
                            fieldLabel  : _('formbuilder.label_form_reply_email_subject'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_reply_email_subject_desc'),
                            name        : 'reply_email_subject',
                            anchor      : '100%'
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_reply_email_subject_desc'),
                            cls         : 'desc-under'
                        }, {
                            xtype       : 'textarea',
                            fieldLabel  : _('formbuilder.label_form_reply_email_content'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_reply_email_content_desc'),
                            name        : 'reply_email_content',
                            anchor      : '100%',
                            listeners   : {
                                afterrender : {
                                    fn          : function(event) {
                                        if (MODx.loadRTE) {
                                            MODx.loadRTE(event.id, FormBuilder.config.tinymce_config);
                                        }
                                    }
                                }
                            }
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_reply_email_content_desc'),
                            cls         : 'desc-under'
                        }, {
                            xtype       : 'modx-combo-browser',
                            fieldLabel  : _('formbuilder.label_form_reply_email_attachment'),
                            description : MODx.expandHelp ? '' : _('formbuilder.label_form_reply_email_attachment_desc'),
                            name        : 'reply_email_attachment',
                            anchor      : '100%',
                            source      : FormBuilder.config.media_source || MODx.config.default_media_source
                        }, {
                            xtype       : MODx.expandHelp ? 'label' : 'hidden',
                            html        : _('formbuilder.label_form_reply_email_attachment_desc'),
                            cls         : 'desc-under'
                        }]
                    }]
                }]
            }, {
                title       : _('formbuilder.form_plugins'),
                items       : [{
                    html        : '<p>' + _('formbuilder.form_plugins_desc') + '</p>',
                    bodyCssClass : 'panel-desc'
                }, {
                    xtype       : 'formbuilder-grid-form-plugins',
                    cls         : 'main-wrapper',
                    preventRender : true,
                    form_id     : config.record.id
                }]
            }]
        }],
        listeners   : {
            'setup'     : {
                fn          : this.onSetup,
                scope       : this
            }
        }
    });

    FormBuilder.panel.Form.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.panel.Form, MODx.FormPanel, {
    initialized: false,

    onSetup: function() {
        if (!this.initialized) {
            this.getForm().setValues(this.record);

            this.initialized = true;
        }

        this.fireEvent('ready');
    },
    onUpdateTitle: function(tf) {
        Ext.getCmp('formbuilder-page-header').getEl().update('<h2>' + _('formbuilder.form') + ': ' + Ext.util.Format.stripTags(tf.getValue()) + '</h2>');
    },
    onCreateField: function(btn, e, record) {
        var fields = Ext.getCmp('formbuilder-grid-form-fields');

        if (fields) {
            fields.addFormField(btn, e, record);
        }
    },
    onHandleSuccessAction: function(tf) {
        var panels = {
            resource    : Ext.getCmp('formbuilder-panel-form-success-action-resource'),
            message     : Ext.getCmp('formbuilder-panel-form-success-action-message')
        };

        Ext.iterate(panels, function(key, panel) {
            if (panel) {
                if (key === tf.getValue()) {
                    panel.show();
                } else {
                    panel.hide();
                }
            }
        });
    },
    onHandleEmail: function(tf) {
        var panel = Ext.getCmp('formbuilder-panel-form-email');

        if (tf.getValue()) {
            panel.show();
        } else {
            panel.hide();
        }
    },
    onHandleReplyEmail: function(tf) {
        var panel = Ext.getCmp('formbuilder-panel-form-reply-email');

        if (tf.getValue()) {
            panel.show();
        } else {
            panel.hide();
        }
    },
    onValidateForm: function() {
        MODx.Ajax.request({
            url         : FormBuilder.config.connector_url,
            params      : {
                action      : 'mgr/forms/validate',
                id          : this.config.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : function (data) {
                        if (data.object) {
                            var panelMessage = Ext.getCmp('formbuilder-panel-form-message');

                            if (panelMessage) {
                                if (data.object.submit === false) {
                                    panelMessage.show();

                                    if (panelMessage.isVisible()) {
                                        panelMessage.update(_('formbuilder.form_error_submit'));
                                    }
                                } else {
                                    panelMessage.hide();
                                }
                            }

                            var panelPlaceholders = Ext.getCmp('formbuilder-panel-form-placeholders');

                            if (panelPlaceholders) {
                                panelPlaceholders.show();

                                var placeholders = [];

                                if (data.object.placeholders) {
                                    Ext.iterate(data.object.placeholders, function(placeholder) {
                                        placeholders.push('[[+' + placeholder + ']]');
                                    });
                                }

                                if (panelPlaceholders.isVisible()) {
                                    panelPlaceholders.update(_('formbuilder.form_email_placeholders', {
                                        placeholders : placeholders.join(', ')
                                    }));
                                }
                            }
                        }
                    },
                    scope       : this
                }
            }
        });
    },
});

Ext.reg('formbuilder-panel-form', FormBuilder.panel.Form);