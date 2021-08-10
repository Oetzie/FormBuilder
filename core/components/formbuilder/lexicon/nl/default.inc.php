<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$_lang['formbuilder']                                           = 'Formulieren generator';
$_lang['formbuilder.desc']                                      = 'Beheer hier alle formulieren.';

$_lang['area_formbuilder']                                      = 'Formulieren generator';

$_lang['setting_formbuilder.branding_url']                      = 'Branding';
$_lang['setting_formbuilder.branding_url_desc']                 = 'De URL waar de branding knop heen verwijst, indien leeg wordt de branding knop niet getoond.';
$_lang['setting_formbuilder.branding_url_help']                 = 'Branding (help)';
$_lang['setting_formbuilder.branding_url_help_desc']            = 'De URL waar de branding help knop heen verwijst, indien leeg wordt de branding help knop niet getoond.';
$_lang['setting_formbuilder.tinymce_config']                    = 'TinyMCE config';
$_lang['setting_formbuilder.tinymce_config_desc']               = 'De config voor de TinyMCE editor, dit moet een geldig JSON formaat zijn. Standaard is "{}".';
$_lang['setting_formbuilder.email_from_regex']                  = 'E-mail van veld regex';
$_lang['setting_formbuilder.email_from_regex_desc']             = 'De regex om het e-mail adres voor het e-mail van veld te controleren, hiermee kun je het e-mail adres bijvoorbeeld controleren of het domein wel juist ivm de mail server. Standaard is "^(([a-zA-Z0-9_\+\.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,5}){1,25})$".';

$_lang['formbuilder.form']                                      = 'Formulier';
$_lang['formbuilder.forms']                                     = 'Formulieren';
$_lang['formbuilder.forms_desc']                                = 'Beheer hier alle formulieren.';
$_lang['formbuilder.form_create']                               = 'Nieuw formulier';
$_lang['formbuilder.form_update']                               = 'Formulier wijzigen';
$_lang['formbuilder.form_manage']                               = 'Formulier beheren';
$_lang['formbuilder.form_remove']                               = 'Formulier verwijderen';
$_lang['formbuilder.form_remove_confirm']                       = 'Weet je zeker dat je dit formulier wilt verwijderen?';

$_lang['formbuilder.label_form_name']                           = 'Naam';
$_lang['formbuilder.label_form_name_desc']                      = 'De naam van het formulier.';
$_lang['formbuilder.label_form_active']                         = 'Actief';
$_lang['formbuilder.label_form_active_desc']                    = '';
$_lang['formbuilder.label_form_active_from']                    = 'Publicatie datum';
$_lang['formbuilder.label_form_active_from_desc']               = 'Indien een publicatie datum ingesteld word, dan zal het formulier zichtbaar worden zodra deze datum bereikt is.';
$_lang['formbuilder.label_form_active_till']                    = 'De-publicatie datum';
$_lang['formbuilder.label_form_active_till_desc']               = 'Indien een de-publicatie datum ingesteld word, dan zal het formulier niet meer zichtbaar zijn zodra deze datum bereikt is.';
$_lang['formbuilder.label_form_success_action']                 = 'Succes actie';
$_lang['formbuilder.label_form_success_action_desc']            = 'De succes actie van het formulier, indien het formulier volledig ingevuld is zal de deze actie getriggerd worden.';
$_lang['formbuilder.label_form_success_resource']               = 'Succes actie pagina';
$_lang['formbuilder.label_form_success_resource_desc']          = 'Selecteer een pagina die als succes pagina functioneert.';
$_lang['formbuilder.label_form_success_message']                = 'Succes actie bericht';
$_lang['formbuilder.label_form_success_message_desc']           = 'Het succes actie bericht van het formulier.';
$_lang['formbuilder.label_form_save']                           = 'Formulieren opslaan';
$_lang['formbuilder.label_form_save_desc']                      = 'Indien aangevinkt zullen alle formulieren opgeslagen worden.';
$_lang['formbuilder.label_form_email']                          = 'Formulier e-mailen naar';
$_lang['formbuilder.label_form_email_desc']                     = 'Indien aangevinkt zal er een e-mail verstuurd worden naar het opgegeven e-mail adres.';
$_lang['formbuilder.label_form_email_to']                       = 'E-mail aan';
$_lang['formbuilder.label_form_email_to_desc']                  = 'Het e-mail adres waar de e-mail heen gestuurd word.';
$_lang['formbuilder.label_form_email_from']                     = 'E-mail van';
$_lang['formbuilder.label_form_email_from_desc']                = 'Het e-mail adres waaruit de e-mail van gestuurd word.';
$_lang['formbuilder.label_form_email_subject']                  = 'E-mail onderwerp';
$_lang['formbuilder.label_form_email_subject_desc']             = 'Het onderwerp van de e-mail.';
$_lang['formbuilder.label_form_email_content']                  = 'E-mail bericht';
$_lang['formbuilder.label_form_email_content_desc']             = 'Het bericht van de e-mail.';
$_lang['formbuilder.label_form_reply_email']                    = 'Formulier bevestigs e-mail';
$_lang['formbuilder.label_form_reply_email_desc']               = 'Indien aangevinkt zal er een bevestigings e-mail verstuurd worden naar de invuller van het formulier.';
$_lang['formbuilder.label_form_reply_email_to']                 = 'Bevestigings e-mail aan veld';
$_lang['formbuilder.label_form_reply_email_to_desc']            = 'Het e-mail adres veld waar de e-mail heen gestuurd word.';
$_lang['formbuilder.label_form_reply_email_from']               = 'Bevestigings e-mail van';
$_lang['formbuilder.label_form_reply_email_from_desc']          = 'Het e-mail adres waaruit de bevestigings e-mail van gestuurd word.';
$_lang['formbuilder.label_form_reply_email_subject']            = 'Bevestigings e-mail onderwerp';
$_lang['formbuilder.label_form_reply_email_subject_desc']       = 'Het onderwerp van de bevestigings e-mail.';
$_lang['formbuilder.label_form_reply_email_content']            = 'Bevestigings e-mail bericht';
$_lang['formbuilder.label_form_reply_email_content_desc']       = 'Het bericht van de bevestigings e-mail.';
$_lang['formbuilder.label_form_reply_email_attachment']         = 'Bevestigings e-mail attachment';
$_lang['formbuilder.label_form_reply_email_attachment_desc']    = 'Selecteer een bestand om mee te sturen als attachment in de bevestigings e-mail.';

$_lang['formbuilder.field_type']                                = 'Veld type';
$_lang['formbuilder.field_types']                               = 'Veld types';
$_lang['formbuilder.field_types_desc']                          = 'Een formulier bestaat uit velden, elk veld kan zijn eigen veld type hebben. Hier kun je alle mogelijke veld types beheren.';
$_lang['formbuilder.field_type_create']                         = 'Nieuw veld type';
$_lang['formbuilder.field_type_update']                         = 'Veld type wijzigen';
$_lang['formbuilder.field_type_remove']                         = 'Veld type verwijderen';
$_lang['formbuilder.field_type_remove_confirm']                 = 'Weet je zeker dat je dit veld type wilt verwijderen?';

$_lang['formbuilder.label_field_type_name']                     = 'Naam';
$_lang['formbuilder.label_field_type_name_desc']                = 'De naam van het veld type.';
$_lang['formbuilder.label_field_type_type']                     = 'Type';
$_lang['formbuilder.label_field_type_type_desc']                = 'De type van het veld type.';
$_lang['formbuilder.label_field_type_active']                   = 'Actief';
$_lang['formbuilder.label_field_type_active_desc']              = '';
$_lang['formbuilder.label_field_type_values']                   = 'Waardes';
$_lang['formbuilder.label_field_type_values_desc']              = 'Dit veld type kan onderliggende waardes hebben, bijvoorbeeld een select, checkbox of radio buttons.';
$_lang['formbuilder.label_field_type_tpl']                      = 'Template';
$_lang['formbuilder.label_field_type_tpl_desc']                 = 'De template van het veld type. Dit kan een chunk zijn, of beginnen met @INLINE of @FILE.';
$_lang['formbuilder.label_field_type_tpl_values']               = 'Templates waardes';
$_lang['formbuilder.label_field_type_tpl_values_desc']          = 'De template van de waardes van het veld type. Dit kan een chunk zijn, of beginnen met @INLINE of @FILE.';
$_lang['formbuilder.label_field_type_icon']                     = 'Icoon';
$_lang['formbuilder.label_field_type_icon_desc']                = 'Het icoon van het veld type.';
$_lang['formbuilder.label_field_type_validate']                 = 'Validatie';
$_lang['formbuilder.label_field_type_validate_desc']            = 'De validatie van het veld type, dit moet een geldig JSON formaat zijn. Bijvoorbeeld \'<code>{"age": 18}</code>\' voor een leeftijdscheck.';
$_lang['formbuilder.label_field_type_fields']                   = 'Beschikbare velden';
$_lang['formbuilder.label_field_type_fields_desc']              = 'De beschikbare velden van het veld type.';

$_lang['formbuilder.plugin']                                    = 'Plugin';
$_lang['formbuilder.plugins']                                   = 'Plugins';
$_lang['formbuilder.plugins_desc']                              = 'Aan een formulier kunnen plugins gekoppeld worden, die getriggerd worden op de events \'<code>onBeforePost</code>\', \'<code>onValidatePost</code>\', \'<code>onValidateFailed</code>\', \'<code>onValidateSuccess</code>\', en \'<code>onAfterPost</code>\'.';
$_lang['formbuilder.plugin_create']                             = 'Nieuw plugin';
$_lang['formbuilder.plugin_update']                             = 'Plugin wijzigen';
$_lang['formbuilder.plugin_remove']                             = 'Plugin verwijderen';
$_lang['formbuilder.plugin_remove_confirm']                     = 'Weet je zeker dat je deze plugin wilt verwijderen?';

$_lang['formbuilder.label_plugin_name']                         = 'Naam';
$_lang['formbuilder.label_plugin_name_desc']                    = 'De naam van de plugin.';
$_lang['formbuilder.label_plugin_description']                  = 'Omschrijving';
$_lang['formbuilder.label_plugin_description_desc']             = 'De omschrijving van de plugin.';
$_lang['formbuilder.label_plugin_active']                       = 'Actief';
$_lang['formbuilder.label_plugin_active_desc']                  = '';
$_lang['formbuilder.label_plugin_snippet']                      = 'Plugin';
$_lang['formbuilder.label_plugin_snippet_desc']                 = 'De snippet van de plugin.';

$_lang['formbuilder.plugin_property']                           = 'Property';
$_lang['formbuilder.plugin_properties']                         = 'Properties';
$_lang['formbuilder.plugin_properties_desc']                    = '';
$_lang['formbuilder.plugin_property_create']                    = 'Nieuwe property';
$_lang['formbuilder.plugin_property_update']                    = 'Property wijzigen';
$_lang['formbuilder.plugin_property_remove']                    = 'Property verwijderen';
$_lang['formbuilder.plugin_property_remove_confirm']            = 'Weet je zeker dat je deze property wilt verwijderen?';

$_lang['formbuilder.label_plugin_property_key']                 = 'Naam';
$_lang['formbuilder.label_plugin_property_key_desc']            = 'De naam van de property.';
$_lang['formbuilder.label_plugin_property_value']               = 'Standaard waarde';
$_lang['formbuilder.label_plugin_property_value_desc']          = 'De standaard waarde van de property.';
$_lang['formbuilder.label_plugin_property_description']         = 'Omschrijving';
$_lang['formbuilder.label_plugin_property_description_desc']    = 'De omschrijving van de property.';

$_lang['formbuilder.form_settings']                             = 'Formulier';
$_lang['formbuilder.form_settings_desc']                        = 'Beheer hier alle algemene instellingen van het formulier.';
$_lang['formbuilder.form_email_settings']                       = 'Formulier e-mailen';
$_lang['formbuilder.form_email_settings_desc']                  = 'Beheer hier alle e-mail instellingen van het formulier.';
$_lang['formbuilder.form_fields']                               = 'Formulier velden';
$_lang['formbuilder.form_fields_desc']                          = 'Beheer hier alle velden van het formulier.';
$_lang['formbuilder.form_plugins']                              = 'Formulier plugins';
$_lang['formbuilder.form_plugins_desc']                         = 'Beheer hier alle plugins van het formulier, deze plugins worden getriggerd op de events \'<code>onBeforePost</code>\', \'<code>onValidatePost</code>\', \'<code>onValidateFailed</code>\', \'<code>onValidateSuccess</code>\', en \'<code>onAfterPost</code>\' events en kunnen bepaalde functionaliteiten aan het formulier toevoegen. De plugins worden getriggerd in de volgorde van hoe ze hieronder staan.';

$_lang['formbuilder.form_field_create']                         = 'Nieuw veld';
$_lang['formbuilder.form_field_update']                         = 'Veld wijzigen';
$_lang['formbuilder.form_field_remove']                         = 'Veld verwijderen';
$_lang['formbuilder.form_field_remove_confirm']                 = 'Weet je zeker dat je dit veld wilt verwijderen?';
$_lang['formbuilder.form_field_duplicate']                      = 'Veld kopiëren';

$_lang['formbuilder.label_form_field_key']                      = 'Sleutel';
$_lang['formbuilder.label_form_field_key_desc']                 = 'De sleutel van het veld.';
$_lang['formbuilder.label_form_field_label']                    = 'Label';
$_lang['formbuilder.label_form_field_label_desc']               = 'De label van het veld.';
$_lang['formbuilder.label_form_field_placeholder']              = 'Placeholder';
$_lang['formbuilder.label_form_field_placeholder_desc']         = 'De tijdelijke placeholder van het veld, deze wordt getoond in het veld indien leeg en legt een gebruiker uit wat in het veld moet worden ingevuld. Bijvoorbeeld "Vul hier uw naam in".';
$_lang['formbuilder.label_form_field_description']              = 'Omschrijving';
$_lang['formbuilder.label_form_field_description_desc']         = 'De omschrijving van het veld.';
$_lang['formbuilder.label_form_field_type']                     = 'Veld type';
$_lang['formbuilder.label_form_field_type_desc']                = 'Het veld type van het veld.';
$_lang['formbuilder.label_form_field_type_plugin']              = 'Plugin';
$_lang['formbuilder.label_form_field_type_plugin_desc']         = 'De plugin die getriggerd word door het veld.';
$_lang['formbuilder.label_form_field_active_desc']              = '';
$_lang['formbuilder.label_form_field_active']                   = 'Actief';
$_lang['formbuilder.label_form_field_active_desc']              = '';
$_lang['formbuilder.label_form_field_required']                 = 'Verplicht';
$_lang['formbuilder.label_form_field_required_desc']            = 'Dit veld is een verplicht veld, dit veld zal worden verduidelijkt met een "*".';
$_lang['formbuilder.label_form_field_validate']                 = 'Validatie';
$_lang['formbuilder.label_form_field_validate_desc']            = 'De validatie van het veld type, dit moet een geldig JSON formaat zijn. Bijvoorbeeld \'<code>{"age": 18}</code>\' voor een leeftijdscheck.';

$_lang['formbuilder.form_plugin_create']                        = 'Nieuwe plugin';
$_lang['formbuilder.form_plugin_update']                        = 'Plugin wijzigen';
$_lang['formbuilder.form_plugin_remove']                        = 'Plugin verwijderen';
$_lang['formbuilder.form_plugin_remove_confirm']                = 'Weet je zeker dat je deze plugin wilt verwijderen? Dit kan er voor zorgen dat bepaalde functionaliteiten van het formulier niet meer werken.';

$_lang['formbuilder.label_form_plugin_plugin']                  = 'Plugin';
$_lang['formbuilder.label_form_plugin_plugin_desc']             = 'De plugin die getriggerd moet worden.';
$_lang['formbuilder.label_form_plugin_active']                  = 'Actief';
$_lang['formbuilder.label_form_plugin_active_desc']             = '';

$_lang['formbuilder.form_plugin_property_create']               = 'Nieuwe property';
$_lang['formbuilder.form_plugin_property_update']               = 'Property wijzigen';
$_lang['formbuilder.form_plugin_property_remove']               = 'Property verwijderen';
$_lang['formbuilder.form_plugin_property_remove_confirm']       = 'Weet je zeker dat je deze property wilt verwijderen?';

$_lang['formbuilder.label_form_plugin_property_key']            = 'Naam';
$_lang['formbuilder.label_form_plugin_property_key_desc']       = 'De naam van de property.';
$_lang['formbuilder.label_form_plugin_property_value']          = 'Waarde';
$_lang['formbuilder.label_form_plugin_property_value_desc']     = 'De waarde van de property.';

$_lang['formbuilder.field_value_create']                        = 'Nieuwe waarde';
$_lang['formbuilder.field_value_update']                        = 'Waarde wijzigen';
$_lang['formbuilder.field_value_remove']                        = 'Waarde verwijderen';
$_lang['formbuilder.field_value_remove_confirm']                = 'Weet je zeker dat je deze waarde wilt verwijderen?';

$_lang['formbuilder.label_form_field_value_label']              = 'Waarde';
$_lang['formbuilder.label_form_field_value_label_desc']         = '';
$_lang['formbuilder.label_form_field_value_active']             = 'Actief';
$_lang['formbuilder.label_form_field_value_active_desc']        = '';
$_lang['formbuilder.label_form_field_value_selected']           = 'Geselecteerd';
$_lang['formbuilder.label_form_field_value_selected_desc']      = 'Deze waarde is standaard geselecteerd.';

$_lang['formbuilder.default_view']                              = 'Standaard weergave';
$_lang['formbuilder.admin_view']                                = 'Admin weergave';
$_lang['formbuilder.back_to_forms']                             = 'Terug naar formulieren';
$_lang['formbuilder.form_not_exists']                           = 'Formulier met het ID "[[+id]]" bestaat niet.';
$_lang['formbuilder.form_fields']                               = 'Formulier velden';
$_lang['formbuilder.form_add_field']                            = 'Veld toevoegen';
$_lang['formbuilder.field_error_character']                     = 'De sleutel bevat niet toegestane tekens. Definieer een andere sleutel.';
$_lang['formbuilder.field_error_exists']                        = 'Een veld met deze sleutel bestaat reeds. Definieer een andere sleutel.';
$_lang['formbuilder.new_field']                                 = 'Nieuw veld';
$_lang['formbuilder.field_type_type_field']                     = 'Veld';
$_lang['formbuilder.field_type_type_field_upload']              = 'Veld (upload)';
$_lang['formbuilder.field_type_type_html']                      = 'HTML';
$_lang['formbuilder.field_type_type_recaptcha']                 = 'Google reCAPTCHA';
$_lang['formbuilder.field_type_type_submit']                    = 'Knop';
$_lang['formbuilder.field_type_plugin_empty']                   = 'Geen plugin';
$_lang['formbuilder.form_field_settings']                       = 'Veld';
$_lang['formbuilder.form_field_values']                         = 'Waardes';
$_lang['formbuilder.form_field_values_not_allowed']             = 'Dit veld heeft geen onderliggende waardes.';
$_lang['formbuilder.plugin_settings']                           = 'Plugin';
$_lang['formbuilder.plugin_properties']                         = 'Properties';
$_lang['formbuilder.form_plugin_settings']                      = 'Plugin';
$_lang['formbuilder.form_plugin_properties']                    = 'Properties';
$_lang['formbuilder.plugin_property_invalid_key']               = 'Dit veld mag alleen A-Z en 0-9 karakters bevatten.';
$_lang['formbuilder.form_error_submit']                         = 'Het formulier heeft (nog) geen knop, een formulier heeft een knop nodig om verstuurd te kunnen worden.';
$_lang['formbuilder.form_email_placeholders']                   = 'In het e-mail onderwerp en bericht kun je de volgende placeholders gebruiken: <code>[[+placeholders]]</code>.';
$_lang['formbuilder.copy_of']                                   = 'Kopie [[+key]]';
$_lang['formbuilder.view_forms']                                = 'Formulieren bekijken';
$_lang['formbuilder.success_action_none']                       = 'Geen';
$_lang['formbuilder.success_action_resource']                   = 'Pagina';
$_lang['formbuilder.success_action_message']                    = 'Tekst';
