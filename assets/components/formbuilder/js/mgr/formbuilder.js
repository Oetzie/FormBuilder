var FormBuilder = function(config) {
    config = config || {};

    FormBuilder.superclass.constructor.call(this, config);
};

Ext.extend(FormBuilder, Ext.Component, {
    page    : {},
    window  : {},
    grid    : {},
    tree    : {},
    panel   : {},
    combo   : {},
    config  : {},
    getField : function(type) {
        if (this.config.field_types[type]) {
            return this.config.field_types[type];
        }

        return {
            values  : 0,
            fields  : []
        };
    }
});

Ext.reg('formbuilder', FormBuilder);

FormBuilder = new FormBuilder();