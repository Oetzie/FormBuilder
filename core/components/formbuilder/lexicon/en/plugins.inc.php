<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$_lang['formbuilder.plugin_recaptcha']                          = 'Google reCAPTCHA';
$_lang['formbuilder.plugin_recaptcha_desc']                     = 'This plug-in will be fired at the \'<code>onBeforePost</code>\' and \'<code>onValidatePost</code>\' events to check the form for spam.';
$_lang['formbuilder.plugin_recaptcha_property_version']         = 'The reCAPTCHA version that will be used. This can be \'v2\' or \'v3\', default is \'v2\'.';

$_lang['formbuilder.plugin_mailchimp']                          = 'MailChimp';
$_lang['formbuilder.plugin_mailchimp_desc']                     = 'This plug-in will be fired at the \'<code>onAfterPost</code>\' event to import the form values into MailChimp.';
$_lang['formbuilder.plugin_mailchimp_property_aliasfields']     = 'The field names of the form fields that will be used for the MailChump API. This must be a valid JSON format, default is \'{"email": "", "email_type": "email_type"}\'.';
$_lang['formbuilder.plugin_mailchimp_property_emailtype']       = 'The e-mail type setting for the MailChimp API. This can be \'html\' or \'text\', default is \'html\'.';
$_lang['formbuilder.plugin_mailchimp_property_list']            = 'The list ID setting for the MailChimp API.';
$_lang['formbuilder.plugin_mailchimp_property_mergefields']     = 'The merge fields for the MailChimp API. This must be a valid JSON format, default is \'{"FNAME": "firstname", "LNAME": "lastname", "PHONE": "phone"}\'.';
$_lang['formbuilder.plugin_mailchimp_property_optin']           = 'The optin setting for the MailChimp API.';
$_lang['formbuilder.plugin_mailchimp_property_optinfield']      = 'The form field to check the optin, when this form field is used the MailChimp API will be fired.';
$_lang['formbuilder.plugin_mailchimp_property_type']            = 'The type subscribe setting for the MailChimp API, this can be \'subscribe\' or \'unsubsribe\', default is \'subscribe\'.';
