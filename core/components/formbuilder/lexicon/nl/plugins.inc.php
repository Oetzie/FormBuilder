<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$_lang['formbuilder.plugin_recaptcha']                          = 'Google reCAPTCHA';
$_lang['formbuilder.plugin_recaptcha_desc']                     = 'Deze plugin word getriggerd op de \'<code>onBeforePost</code>\' en \'<code>onValidatePost</code>\' events om de formulier te controleren op spam.';
$_lang['formbuilder.plugin_recaptcha_property_version']         = 'De reCAPTCHA versie die gebruikt moet worden. Dit kan \'v2\' of \'v3\' zijn, standaard is \'v2\'.';

$_lang['formbuilder.plugin_mailchimp']                          = 'MailChimp';
$_lang['formbuilder.plugin_mailchimp_desc']                     = 'Deze plugin word getriggerd op de \'<code>onAfterPost</code>\' event om de formulier waarden naar MailChimp te importeren.';
$_lang['formbuilder.plugin_mailchimp_property_aliasfields']     = 'De velden namen van de formulier velden die gebruikt worden voor de MailChimp API. Dit moet een geldig JSON formaat zijn, standaard is \'{"email": "", "email_type": "email_type"}\'.';
$_lang['formbuilder.plugin_mailchimp_property_emailtype']       = 'De e-mail type instelling voor de MailChimp API. Dit kan \'html\' of \'text\' zijn, standaard is \'html\'.';
$_lang['formbuilder.plugin_mailchimp_property_list']            = 'De lijst ID instelling voor de MailChimp API.';
$_lang['formbuilder.plugin_mailchimp_property_mergefields']     = 'De merge velden voor de MailChimp API. Dit moet een geldig JSON formaat zijn, standaard is \'{"FNAME": "firstname", "LNAME": "lastname", "PHONE": "phone"}\'.';
$_lang['formbuilder.plugin_mailchimp_property_optin']           = 'De optin instelling voor de MailChimp API.';
$_lang['formbuilder.plugin_mailchimp_property_optinfield']      = 'Het formulier veld waarop de optin gecontroleerd worden, indien dit formulier veld ingevuld is zal de MailChimp API getriggerd worden.';
$_lang['formbuilder.plugin_mailchimp_property_type']            = 'De type inschrijving instelling voor de MailChimp API, dit kan \'subscribe\' of \'unsubsribe\' zijn, standaard is \'subscribe\'.';
