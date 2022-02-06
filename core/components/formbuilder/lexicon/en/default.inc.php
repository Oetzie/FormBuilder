<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$_lang['formbuilder']                                           = 'Form generator';
$_lang['formbuilder.desc']                                      = 'Change or manage forms.';

$_lang['area_formbuilder']                                      = 'Form generator';

$_lang['setting_formbuilder.branding_url']                      = 'Branding';
$_lang['setting_formbuilder.branding_url_desc']                 = 'The URL of the branding button, if the URL is empty the branding button won\'t be shown.';
$_lang['setting_formbuilder.branding_url_help']                 = 'Branding (help)';
$_lang['setting_formbuilder.branding_url_help_desc']            = 'The URL of the branding help button, if the URL is empty the branding help button won\'t be shown.';
$_lang['setting_formbuilder.tinymce_config']                    = 'TinyMCE config';
$_lang['setting_formbuilder.tinymce_config_desc']               = 'The config of the TinyMCE editor, this must be a valid JSON format. Default is "{}".';
$_lang['setting_formbuilder.email_from_regex']                  = '-mail from field regex';
$_lang['setting_formbuilder.email_from_regex_desc']             = 'The regex to validate the e-mail address of the e-mail from field, with this you can check the e-mail address, for example, whether the domain is correct in connection with the mail server. Default is "^(([a-zA-Z0-9_\+\.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,5}){1,25})$".';

$_lang['formbuilder.form']                                      = 'Form';
$_lang['formbuilder.forms']                                     = 'Forms';
$_lang['formbuilder.forms_desc']                                = 'Here you can manage all the forms.';
$_lang['formbuilder.form_create']                               = 'Create new form';
$_lang['formbuilder.form_update']                               = 'Update form';
$_lang['formbuilder.form_manage']                               = 'Manage form';
$_lang['formbuilder.form_remove']                               = 'Delete form';
$_lang['formbuilder.form_remove_confirm']                       = 'Are you sure you want to remove this form?';

$_lang['formbuilder.label_form_name']                           = 'Name';
$_lang['formbuilder.label_form_name_desc']                      = 'The name of the form.';
$_lang['formbuilder.label_form_active']                         = 'Active';
$_lang['formbuilder.label_form_active_desc']                    = '';
$_lang['formbuilder.label_form_active_from']                    = 'Publication date';
$_lang['formbuilder.label_form_active_from_desc']               = 'If a publication date is set, the form will become visible as soon as this date is reached.';
$_lang['formbuilder.label_form_active_till']                    = 'De-publication date';
$_lang['formbuilder.label_form_active_till_desc']               = 'If a de-publication date is set, the form will no longer be visible once this date is reached.';
$_lang['formbuilder.label_form_success_action']                 = 'Success action';
$_lang['formbuilder.label_form_success_action_desc']            = 'The success action of the form, if the form is filled in, this action will be fired.';
$_lang['formbuilder.label_form_success_resource']               = 'Success action resource';
$_lang['formbuilder.label_form_success_resource_desc']          = 'Select a resource that functions as a success resource.';
$_lang['formbuilder.label_form_success_message']                = 'Success action message';
$_lang['formbuilder.label_form_success_message_desc']           = 'The success action message of the form.';
$_lang['formbuilder.label_form_save']                           = 'Save forms';
$_lang['formbuilder.label_form_save_desc']                      = 'If checked, all forms will be saved.';
$_lang['formbuilder.label_form_email']                          = 'Email form to';
$_lang['formbuilder.label_form_email_desc']                     = 'If checked, an email will be sent to the specified email address.';
$_lang['formbuilder.label_form_email_to']                       = 'Email to';
$_lang['formbuilder.label_form_email_to_desc']                  = 'The e-mail address where the email will be sent.';
$_lang['formbuilder.label_form_email_from']                     = 'Email from';
$_lang['formbuilder.label_form_email_from_desc']                = 'The e-mail address from which the email is sent.';
$_lang['formbuilder.label_form_email_subject']                  = 'Email subject';
$_lang['formbuilder.label_form_email_subject_desc']             = 'The subject of the email.';
$_lang['formbuilder.label_form_email_content']                  = 'Email message';
$_lang['formbuilder.label_form_email_content_desc']             = 'The message of the email.';
$_lang['formbuilder.label_form_reply_email']                    = 'Form confirmation email';
$_lang['formbuilder.label_form_reply_email_desc']               = 'If checked, a confirmation email will be sent to the person who completed the form.';
$_lang['formbuilder.label_form_reply_email_to']                 = 'Confirmation email to field';
$_lang['formbuilder.label_form_reply_email_to_desc']            = 'The e-mail address field where the email will be sent.';
$_lang['formbuilder.label_form_reply_email_from']               = 'Confirmation email from';
$_lang['formbuilder.label_form_reply_email_from_desc']          = 'The e-mail address from which the confirmation email will be sent.';
$_lang['formbuilder.label_form_reply_email_subject']            = 'Confirmation email subject';
$_lang['formbuilder.label_form_reply_email_subject_desc']       = 'The subject of the confirmation email.';
$_lang['formbuilder.label_form_reply_email_content']            = 'Confirmation email message';
$_lang['formbuilder.label_form_reply_email_content_desc']       = 'The message of the confirmation email.';
$_lang['formbuilder.label_form_reply_email_attachment']         = 'Confirmation email attachment';
$_lang['formbuilder.label_form_reply_email_attachment_desc']    = 'Select a file to send as an attachment in the confirmation email.';

$_lang['formbuilder.field_type']                                = 'Field type';
$_lang['formbuilder.field_types']                               = 'Field types';
$_lang['formbuilder.field_types_desc']                          = 'A form can contain multiple fields. each field can have his own field type. Here you can manage all possible field types.';
$_lang['formbuilder.field_type_create']                         = 'Create new type';
$_lang['formbuilder.field_type_update']                         = 'Update field type';
$_lang['formbuilder.field_type_remove']                         = 'Delete field type';
$_lang['formbuilder.field_type_remove_confirm']                 = 'Are you sure you want to delete this field type?';

$_lang['formbuilder.label_field_type_name']                     = 'Name';
$_lang['formbuilder.label_field_type_name_desc']                = 'The name of the field type.';
$_lang['formbuilder.label_field_type_type']                     = 'Type';
$_lang['formbuilder.label_field_type_type_desc']                = 'The type of the field type.';
$_lang['formbuilder.label_field_type_active']                   = 'Active';
$_lang['formbuilder.label_field_type_active_desc']              = '';
$_lang['formbuilder.label_field_type_values']                   = 'Values';
$_lang['formbuilder.label_field_type_values_desc']              = 'This field type can contain sub values, for example a select, checkbox of radio buttons.';
$_lang['formbuilder.label_field_type_tpl']                      = 'Template';
$_lang['formbuilder.label_field_type_tpl_desc']                 = 'The template of the field type. This can be a chunk, or can start with @INLINE or @FILE.';
$_lang['formbuilder.label_field_type_tpl_values']               = 'Template values';
$_lang['formbuilder.label_field_type_tpl_values_desc']          = 'The template of the sub values of the field type. This can be a chunk, or can start with @INLINE or @FILE.';
$_lang['formbuilder.label_field_type_icon']                     = 'Icon';
$_lang['formbuilder.label_field_type_icon_desc']                = 'The icoonof the field type.';
$_lang['formbuilder.label_field_type_validate']                 = 'Validation';
$_lang['formbuilder.label_field_type_validate_desc']            = 'The validation of the field type, this must be a valid JSON format. For example \'<code>{"age": 18}</code>\' to create an age check.';
$_lang['formbuilder.label_field_type_fields']                   = 'Available fields';
$_lang['formbuilder.label_field_type_fields_desc']              = 'The available fields of the field type.';

$_lang['formbuilder.plugin']                                    = 'Plugin';
$_lang['formbuilder.plugins']                                   = 'Plugins';
$_lang['formbuilder.plugins_desc']                              = 'Plugins can be used on a form, these plugins will be fired on the \'<code>onBeforePost</code>\', \'<code>onValidatePost</code>\', \'<code>onValidateFailed</code>\', \'<code>onValidateSuccess</code>\', and \'<code>onAfterPost</code>\' events.';
$_lang['formbuilder.plugin_create']                             = 'Create new plugin';
$_lang['formbuilder.plugin_update']                             = 'Update plugin';
$_lang['formbuilder.plugin_remove']                             = 'Delete plugin';
$_lang['formbuilder.plugin_remove_confirm']                     = 'Are you sure you want to delete this plugin?';

$_lang['formbuilder.label_plugin_name']                         = 'Name';
$_lang['formbuilder.label_plugin_name_desc']                    = 'The name of the plugin.';
$_lang['formbuilder.label_plugin_description']                  = 'Description';
$_lang['formbuilder.label_plugin_description_desc']             = 'The description of the plugin.';
$_lang['formbuilder.label_plugin_active']                       = 'Active';
$_lang['formbuilder.label_plugin_active_desc']                  = '';
$_lang['formbuilder.label_plugin_snippet']                      = 'Plugin';
$_lang['formbuilder.label_plugin_snippet_desc']                 = 'The action or snippet of the plugin.';

$_lang['formbuilder.plugin_property']                           = 'Property';
$_lang['formbuilder.plugin_properties']                         = 'Properties';
$_lang['formbuilder.plugin_properties_desc']                    = '';
$_lang['formbuilder.plugin_property_create']                    = 'Create new property';
$_lang['formbuilder.plugin_property_update']                    = 'Update property';
$_lang['formbuilder.plugin_property_remove']                    = 'Delete property';
$_lang['formbuilder.plugin_property_remove_confirm']            = 'Are you sure you want to delete this property?';

$_lang['formbuilder.label_plugin_property_key']                 = 'Name';
$_lang['formbuilder.label_plugin_property_key_desc']            = 'The name of the property.';
$_lang['formbuilder.label_plugin_property_value']               = 'Default value';
$_lang['formbuilder.label_plugin_property_value_desc']          = 'The default value of the property.';
$_lang['formbuilder.label_plugin_property_description']         = 'Description';
$_lang['formbuilder.label_plugin_property_description_desc']    = 'The description of the property.';

$_lang['formbuilder.form_settings']                             = 'Form';
$_lang['formbuilder.form_settings_desc']                        = 'Manage here all the default settings for the form.';
$_lang['formbuilder.form_email_settings']                       = 'Form emails';
$_lang['formbuilder.form_email_settings_desc']                  = 'Manage here all the email settings of the form.';
$_lang['formbuilder.form_fields']                               = 'Form fields';
$_lang['formbuilder.form_fields_desc']                          = 'Manage here all the fields of the form';
$_lang['formbuilder.form_plugins']                              = 'Form plugins';
$_lang['formbuilder.form_plugins_desc']                         = 'Manage here all the plugins of the form, these plugins will be fired on the \'<code>onBeforePost</code>\', \'<code>onValidatePost</code>\', \'<code>onValidateFailed</code>\', \'<code>onValidateSuccess</code>\', and \'<code>onAfterPost</code>\' events and can add certain functionalities to the form. The plugins are fired in the order they are listed below.';

$_lang['formbuilder.form_field_create']                         = 'Create field';
$_lang['formbuilder.form_field_update']                         = 'Update field';
$_lang['formbuilder.form_field_remove']                         = 'Remove field';
$_lang['formbuilder.form_field_remove_confirm']                 = 'Are you sure you want to remove this field?';
$_lang['formbuilder.form_field_duplicate']                      = 'Copy field';

$_lang['formbuilder.label_form_field_key']                      = 'Key';
$_lang['formbuilder.label_form_field_key_desc']                 = 'The key of the field.';
$_lang['formbuilder.label_form_field_label']                    = 'Label';
$_lang['formbuilder.label_form_field_label_desc']               = 'The label of the field.';
$_lang['formbuilder.label_form_field_placeholder']              = 'Placeholder';
$_lang['formbuilder.label_form_field_placeholder_desc']         = 'The placeholder of the field, it is shown in the field if empty and explains to a user what to enter in the field. For example "Enter your name here".';
$_lang['formbuilder.label_form_field_description']              = 'Description';
$_lang['formbuilder.label_form_field_description_desc']         = 'The description of the field.';
$_lang['formbuilder.label_form_field_type']                     = 'Field type';
$_lang['formbuilder.label_form_field_type_desc']                = 'The field type of the field.';
$_lang['formbuilder.label_form_field_type_plugin']              = 'Plug-in';
$_lang['formbuilder.label_form_field_type_plugin_desc']         = 'The plug-in that will be triggerd by this field.';
$_lang['formbuilder.label_form_field_active_desc']              = '';
$_lang['formbuilder.label_form_field_active']                   = 'Active';
$_lang['formbuilder.label_form_field_active_desc']              = '';
$_lang['formbuilder.label_form_field_required']                 = 'Required';
$_lang['formbuilder.label_form_field_required_desc']            = 'This field is a required field, this field will be clarified with a "*".';
$_lang['formbuilder.label_form_field_validate']                 = 'Validation';
$_lang['formbuilder.label_form_field_validate_desc']            = 'The validation of the field type, this must be a valid JSON format. for example \'<code>{"age": 18}</code>\' for a age check.';

$_lang['formbuilder.form_plugin_create']                        = 'Create plug-in';
$_lang['formbuilder.form_plugin_update']                        = 'Update plug-in';
$_lang['formbuilder.form_plugin_remove']                        = 'Remove plug-in';
$_lang['formbuilder.form_plugin_remove_confirm']                = 'Are you sure you want to remove this plug-in? This can cause certain functionalities of the form to stop working.';

$_lang['formbuilder.label_form_plugin_plugin']                  = 'Plug-in';
$_lang['formbuilder.label_form_plugin_plugin_desc']             = 'The plug-in that needs to be triggerd.';
$_lang['formbuilder.label_form_plugin_active']                  = 'Active';
$_lang['formbuilder.label_form_plugin_active_desc']             = '';

$_lang['formbuilder.form_plugin_property_create']               = 'Create property';
$_lang['formbuilder.form_plugin_property_update']               = 'Update property';
$_lang['formbuilder.form_plugin_property_remove']               = 'Remove property';
$_lang['formbuilder.form_plugin_property_remove_confirm']       = 'Are you sure you want to remove this property?';

$_lang['formbuilder.label_form_plugin_property_key']            = 'Name';
$_lang['formbuilder.label_form_plugin_property_key_desc']       = 'The name of the property.';
$_lang['formbuilder.label_form_plugin_property_value']          = 'Value';
$_lang['formbuilder.label_form_plugin_property_value_desc']     = 'The value of the property.';

$_lang['formbuilder.field_value_create']                        = 'Create value';
$_lang['formbuilder.field_value_update']                        = 'Update value';
$_lang['formbuilder.field_value_remove']                        = 'Remove value';
$_lang['formbuilder.field_value_remove_confirm']                = 'Are you sure you want to remove this value?';

$_lang['formbuilder.label_form_field_value_label']              = 'Value';
$_lang['formbuilder.label_form_field_value_label_desc']         = '';
$_lang['formbuilder.label_form_field_value_active']             = 'Active';
$_lang['formbuilder.label_form_field_value_active_desc']        = '';
$_lang['formbuilder.label_form_field_value_selected']           = 'Selected';
$_lang['formbuilder.label_form_field_value_selected_desc']      = 'This value is selected by default.';

$_lang['formbuilder.default_view']                              = 'Default view';
$_lang['formbuilder.admin_view']                                = 'Admin view';
$_lang['formbuilder.back_to_forms']                             = 'Back to forms';
$_lang['formbuilder.form_not_exists']                           = 'Form with the ID "[[+id]]" does not exists.';
$_lang['formbuilder.form_fields']                               = 'Form fields';
$_lang['formbuilder.form_add_field']                            = 'Add field';
$_lang['formbuilder.form_error_exists']                         = 'A form with this name already exists. Please specify another name.';
$_lang['formbuilder.field_error_character']                     = 'The key contains forbidden characters. Please specify another key.';
$_lang['formbuilder.field_error_exists']                        = 'A field with this key already exists. Please specify another key.';
$_lang['formbuilder.new_field']                                 = 'New field';
$_lang['formbuilder.field_type_type_field']                     = 'Field';
$_lang['formbuilder.field_type_type_field_upload']              = 'Field (upload)';
$_lang['formbuilder.field_type_type_html']                      = 'HTML';
$_lang['formbuilder.field_type_type_recaptcha']                 = 'Google reCAPTCHA';
$_lang['formbuilder.field_type_type_submit']                    = 'Button';
$_lang['formbuilder.field_type_plugin_empty']                   = 'No plugin';
$_lang['formbuilder.form_field_settings']                       = 'Field';
$_lang['formbuilder.form_field_values']                         = 'Values';
$_lang['formbuilder.form_field_values_not_allowed']             = 'This field has no child values.';
$_lang['formbuilder.plugin_settings']                           = 'Plugin';
$_lang['formbuilder.plugin_properties']                         = 'Properties';
$_lang['formbuilder.form_plugin_settings']                      = 'Plugin';
$_lang['formbuilder.form_plugin_properties']                    = 'Properties';
$_lang['formbuilder.plugin_property_invalid_key']               = 'This field can only contain A-Z and 0-9 characters.';
$_lang['formbuilder.form_error_submit']                         = 'This form has no button, a form requires a button to be send.';
$_lang['formbuilder.form_email_placeholders']                   = 'In the e-mail subject and message you can use the following placeholders: <code>[[+placeholders]]</code>.';
$_lang['formbuilder.copy_of']                                   = 'Copy [[+key]]';
$_lang['formbuilder.view_forms']                                = 'View forms';
$_lang['formbuilder.success_action_none']                       = 'None';
$_lang['formbuilder.success_action_resource']                   = 'Resource';
$_lang['formbuilder.success_action_message']                    = 'Text';
