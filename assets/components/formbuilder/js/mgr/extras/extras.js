FormBuilder.combo.FieldTypes = function(config) {
    config = config || {};

    var items = this.getItems();

    Ext.apply(config, {
        cls     : 'x-form-builder-field-types',
        items   : [{
            layout      : 'column',
            items       : [{
                columnWidth : .5,
                items       : items.slice(0, Math.ceil(items.length / 2))
            }, {
                columnWidth : .5,
                items       : items.slice(Math.ceil(items.length / 2))
            }]
        }]
    });

    FormBuilder.combo.FieldTypes.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.FieldTypes, MODx.Panel, {
    getItems: function() {
        var items = [];
        var types = Object.values(FormBuilder.config.field_types);

        types.sort(function(a, b) {
            return a.menuindex - b.menuindex;
        });

        types.forEach((function(record) {
            items.push({
                xtype   : 'container',
                cls     : 'x-form-field',
                items   : [{
                    xtype   : 'button',
                    text    : '<i class="icon icon-' + record.icon + '"></i>' + record.name_formatted,
                    handler : this.onHandleButton,
                    scope   : this,
                    record  : record
                }]
            });
        }).bind(this));

        return items;
    },
    onHandleButton: function(btn, e) {
        this.fireEvent('change', btn, e, btn.record);
    }
});

Ext.reg('formbuilder-combo-field-types', FormBuilder.combo.FieldTypes);

FormBuilder.combo.FieldType = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        store       : new Ext.data.ArrayStore({
            mode        : 'local',
            fields      : ['type', 'label'],
            data        : [
                ['field', _('formbuilder.field_type_type_field')],
                ['field_upload', _('formbuilder.field_type_type_field_upload')],
                ['html', _('formbuilder.field_type_type_html')],
                ['recaptcha', _('formbuilder.field_type_type_recaptcha')],
                ['submit', _('formbuilder.field_type_type_submit')]
            ]
        }),
        remoteSort  : ['label', 'asc'],
        hiddenName  : 'type',
        valueField  : 'type',
        displayField : 'label',
        mode        : 'local',
        value       : 'field'
    });

    FormBuilder.combo.FieldType.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.FieldType, MODx.combo.ComboBox);

Ext.reg('formbuilder-combo-field-type', FormBuilder.combo.FieldType);

FormBuilder.combo.Plugins = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/plugins/getlist',
            emptyValue  : config.emptyValue || false,
            combo       : true
        },
        fields      : ['id', 'name', 'name_formatted', 'description', 'description_formatted'],
        hiddenName  : 'plugin_id',
        valueField  : 'id',
        displayField : 'name_formatted',
        tpl         : new Ext.XTemplate('<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '<tpl if="id == 0">' +
                    '<strong>{name_formatted}</strong>' +
                '</tpl>' +
                '<tpl if="id != 0">' +
                    '<span style="font-weight: bold;">{name_formatted}</span>' +
                '</tpl>' +
                '<br /><i>{description_formatted}</i>' +
            '</div>' +
        '</tpl>')
    });

    if (config.emptyValue) {
        config.value = 0;
    }

    FormBuilder.combo.Plugins.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.Plugins, MODx.combo.ComboBox);

Ext.reg('formbuilder-combo-plugins', FormBuilder.combo.Plugins);

FormBuilder.combo.PluginProperties = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/plugins/properties/getlist',
            plugin      : config.plugin || 0,
            combo       : true
        },
        fields      : ['key', 'value', 'description'],
        hiddenName  : 'key',
        valueField  : 'key',
        displayField : 'key',
        tpl         : new Ext.XTemplate('<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '<span style="font-weight: bold;">{key}</span>' +
                '<br /><i>{description}</i>' +
            '</div>' +
        '</tpl>')
    });

    FormBuilder.combo.PluginProperties.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.PluginProperties, MODx.combo.ComboBox);

Ext.reg('formbuilder-combo-plugin-properties', FormBuilder.combo.PluginProperties);

FormBuilder.combo.Fields = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        url         : FormBuilder.config.connector_url,
        baseParams  : {
            action      : 'mgr/forms/fields/getlist',
            form_id     : config.form_id,
            emailOnly   : config.emailOnly || false,
            combo       : true
        },
        fields      : ['id', 'label', 'label_formatted', 'field_type_name', 'field_type_icon'],
        hiddenName  : 'field_id',
        valueField  : 'id',
        displayField : 'label_formatted',
        tpl         : new Ext.XTemplate('<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '<span class="icon icon-{field_type_icon}"></span>{label_formatted}' +
            '</div>' +
        '</tpl>')
    });

    FormBuilder.combo.Fields.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.Fields, MODx.combo.ComboBox);

Ext.reg('formbuilder-combo-fields', FormBuilder.combo.Fields);

FormBuilder.combo.SuccessAction = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        store       : new Ext.data.ArrayStore({
            mode        : 'local',
            fields      : ['type', 'label'],
            data        : [
                ['', _('formbuilder.success_action_none')],
                ['resource', _('formbuilder.success_action_resource')],
                ['message', _('formbuilder.success_action_message')]
            ]
        }),
        remoteSort  : ['label', 'asc'],
        hiddenName  : 'success_action',
        valueField  : 'type',
        displayField : 'label',
        mode        : 'local',
        value       : 'none'
    });

    FormBuilder.combo.SuccessAction.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder.combo.SuccessAction, MODx.combo.ComboBox);

Ext.reg('formbuilder-combo-success-action', FormBuilder.combo.SuccessAction);
