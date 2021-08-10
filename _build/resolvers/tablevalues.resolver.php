<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$package = 'FormBuilder';

$tvs = [[
    'type'          => 'listbox',
    'name'          => 'formbuilder',
    'caption'       => 'Form',
    'elements'      => '@SELECT \'- Select a form -\' AS name, 0 AS id UNION ALL SELECT name,id FROM [[+PREFIX]]formbuilder_form ORDER BY name ASC'
]];

$plugins = [[
    'name'          => 'recaptcha',
    'snippet'       => 'recaptcha',
    'properties'    => '[{"id":"fwjyrlo63","key":"version","value":"v2","description":""}]',
    'active'        => 1
], [
    'name'          => 'mailchimp',
    'snippet'       => 'FormMailChimp',
    'properties'    => '[{"id":"uhy03110m","key":"aliasFields","value":"{\"email\": \"email\", \"email_type\": \"email_type\"}","description":""},{"id":"uyr79ejfx","key":"emailType","value":"html","description":""},{"id":"hxlfd8t9q","key":"list","value":"cec22053db","description":""},{"id":"x2ce7sxur","key":"mergeFields","value":"{\"FNAME\": \"firstname\", \"LNAME\": \"lastname\", \"PHONE\": \"phone\"}","description":""},{"id":"6m0qcd8le","key":"optin","value":"0","description":""},{"id":"uw9c2038r","key":"optinField","value":"","description":""},{"id":"vkcdegus8","key":"type","value":"subscribe","description":""}]',
    'active'        => 1
]];

$fields = [[
    'type'          => 'field',
    'name'          => 'textfield',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldtextfield.tpl',
    'tpl_values'    => '',
    'icon'          => 'text-width',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '',
    'menuindex'     => 0,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'textarea',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldtextarea.tpl',
    'tpl_values'    => '',
    'icon'          => 'text-height',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '',
    'menuindex'     => 1,
    'active'        => 1
], [
    'type'          => 'email',
    'name'          => 'email',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldemail.tpl',
    'tpl_values'    => '',
    'icon'          => 'envelope',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '{"email": true}',
    'menuindex'     => 2,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'select',
    'values'        => 1,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldselect.tpl',
    'tpl_values'    => '@FILE elements/chunks/formbuilder/formfieldselectvalue.tpl',
    'icon'          => 'check',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '',
    'menuindex'     => 5,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'checkbox',
    'values'        => 1,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldcheckbox.tpl',
    'tpl_values'    => '@FILE elements/chunks/formbuilder/formfieldcheckboxvalue.tpl',
    'icon'          => 'check-square',
    'fields'        => '["key","validate","description","required"]',
    'validate'      => '',
    'menuindex'     => 6,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'radio',
    'values'        => 1,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldradio.tpl',
    'tpl_values'    => '@FILE elements/chunks/formbuilder/formfieldradiovalue.tpl',
    'icon'          => 'check-circle',
    'fields'        => '["key","validate","description","required"]',
    'validate'      => '',
    'menuindex'     => 7,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'phone',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldphone.tpl',
    'tpl_values'    => '',
    'icon'          => 'phone',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '{"phone": true}',
    'menuindex'     => 3,
    'active'        => 1
], [
    'type'          => 'field',
    'name'          => 'date',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfielddate.tpl',
    'tpl_values'    => '',
    'icon'          => 'calendar',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '{"date": true}',
    'menuindex'     => 4,
    'active'        => 1
], [
    'type'          => 'html',
    'name'          => 'heading',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldheading.tpl',
    'tpl_values'    => '',
    'icon'          => 'header',
    'fields'        => '[]',
    'validate'      => '',
    'menuindex'     => 9,
    'active'        => 1
], [
    'type'          => 'html',
    'name'          => 'content',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldcontent.tpl',
    'tpl_values'    => '',
    'icon'          => 'paragraph',
    'fields'        => '["description"]',
    'validate'      => '',
    'menuindex'     => 10,
    'active'        => 1
], [
    'type'          => 'submit',
    'name'          => 'submit',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldsubmit.tpl',
    'tpl_values'    => '',
    'icon'          => 'send',
    'fields'        => '[]',
    'validate'      => '',
    'menuindex'     => 12,
    'active'        => 1
], [
    'type'          => 'recaptcha',
    'name'          => 'recaptcha',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldrecaptcha.tpl',
    'tpl_values'    => '',
    'icon'          => 'shield',
    'fields'        => '["description"]',
    'validate'      => '',
    'menuindex'     => 11,
    'active'        => 1,
    'plugin'        => 'recaptcha'
], [
    'type'          => 'field_upload',
    'name'          => 'upload',
    'values'        => 0,
    'tpl'           => '@FILE elements/chunks/formbuilder/formfieldupload.tpl',
    'tpl_values'    => '',
    'icon'          => 'upload',
    'fields'        => '["key","placeholder","validate","description","required"]',
    'validate'      => '{"file": true, "fileExtension": "jpg,jpeg,png,gif"}',
    'menuindex'     => 8,
    'active'        => 1
]];

$success = false;

if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $modx =& $object->xpdo;

            foreach ($tvs as $tv) {
                if (isset($tv['name'])) {
                    $object = $modx->getObject('modTemplateVar', [
                        'name' => $tv['name']
                    ]);

                    if (!$object) {
                        $object = $modx->newObject('modTemplateVar');
                    }

                    $object->fromArray($tv);
                    $object->save();

                    $category = $modx->getObject('modCategory', [
                        'category' => $package
                    ]);

                    if ($category) {
                        $object->set('category', $category->get('id'));
                        $object->save();
                    }
                }
            }

            foreach ($plugins as $plugin) {
                if (isset($plugin['name'])) {
                    $object = $modx->getObject('FormBuilderPlugin', [
                        'name' => $plugin['name']
                    ]);

                    if (!$object) {
                        $object = $modx->newObject('FormBuilderPlugin');
                    }

                    $object->fromArray($plugin);
                    $object->save();
                }
            }

            foreach ($fields as $field) {
                if (isset($field['name'])) {
                    $object = $modx->getObject('FormBuilderFieldType', [
                        'name' => $field['name']
                    ]);

                    if (!$object) {
                        $object = $modx->newObject('FormBuilderFieldType');
                    }

                    $object->fromArray($field);
                    $object->save();

                    if (isset($field['plugin'])) {
                        $plugin = $modx->getObject('FormBuilderPlugin', [
                            'name' => $field['plugin']
                        ]);

                        if ($plugin) {
                            $object->set('plugin_id', $plugin->get('id'));
                            $object->save();
                        }
                    }
                }
            }

            $success = true;

            break;
        case xPDOTransport::ACTION_UNINSTALL:
            $success = true;

            break;
    }
}

return $success;
