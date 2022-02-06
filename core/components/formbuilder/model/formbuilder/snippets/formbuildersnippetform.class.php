<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(__DIR__) . '/formbuildersnippets.class.php';

class FormBuilderSnippetForm extends FormBuilderSnippets
{
    /**
     * @access public.
     * @var Array.
     */
    public $properties = [
        'form'                  => '',

        'submit'                => 'formbuilder-{id}',

        'validator'             => [],
        'validatorMessages'     => [],

        'plugins'               => [],

        'tpl'                   => '',
        'tplEmail'              => '',
        'tplEmailReply'         => '',
        'tplEmailWrapper'       => '',

        'tplEmailField'         => '@INLINE <tr>
            <td width="250" align="left" valign="top">[[+label]]</td>
            <td align="left" valign="top">[[+value]]</td>
        </tr>',
        'tplEmailFieldWrapper'  => '@INLINE <table width="100%" border="0" cellpadding="0" cellspacing="0">
            [[+output]]
        </table>'
    ];

    /**
     * @access public.
     * @param Array $properties.
     * @return Array|String.
     */
    public function run(array $properties = [])
    {
        $this->setProperties($this->getFormattedProperties($properties));

        $form = $this->getProperty('form');

        if (empty($form) && $this->modx->resource !== null) {
            $form = $this->modx->resource->getTVValue('formbuilder');
        }

        $object = $this->getForm($form);

        if ($object) {
            $submit     = str_replace('{id}', $object->get('id'), $this->getProperty('submit'));

            $validator  = $this->getProperty('validator');
            $plugins    = $this->getProperty('plugins');

            $fields     = [];

            if ($object->get('success_action') === 'resource') {
                $this->setProperty('success', $object->get('success_resource'));
            } else if ($object->get('success_action') === 'message') {
                $this->setProperty('successMessage', $object->get('success_message'));
            }

            foreach ((array) $object->getFields() as $field) {
                $fieldType = $field->getFieldType();

                if ($fieldType) {
                    if ($validate = $fieldType->getValidation()) {
                        foreach ((array) $validate as $type => $rule) {
                            $validator[$field->get('key')][$type] = $rule;
                        }
                    }

                    if ($validate = $field->getValidation()) {
                        foreach ((array) $validate as $type => $rule) {
                            $validator[$field->get('key')][$type] = $rule;
                        }
                    }

                    if ($plugin = $field->getPlugin()) {
                        $plugins[$plugin->get('snippet')] = $plugin->getProperties();
                    }

                    if ((int) $object->get('save') === 1) {
                        if ($fieldType->isField()) {
                            $fields[$field->get('key')] = [
                                'label' => $field->get('label')
                            ];
                        }
                    }
                }
            }

            foreach ((array) $object->getPlugins() as $plugin) {
                $plugins[$plugin->get('snippet')] = $plugin->getProperties();
            }

            if ((int) $object->get('save') === 1) {
                if (count($fields) >= 1) {
                    $plugins['save'] = [
                        'name'      => $object->get('name'),
                        'fields'    => $fields
                    ];
                }
            }

            if ((int) $object->get('email') === 1) {
                if (!empty($object->get('email_to'))) {
                    $plugins['email'] = [
                        'emailTo'       => $object->get('email_to'),
                        'emailFrom'     => $this->modx->getOption('emailsender'),
                        'emailReply'    => $object->get('email_from') ?: $this->modx->getOption('emailsender'),
                        'subject'       => $object->get('email_subject') ?: $object->get('name'),
                        'placeholders'  => [
                            'content'       => $object->get('email_content')
                        ],
                        'tpl'           => $this->getProperty('tplEmail'),
                        'tplWrapper'    => $this->getProperty('tplEmailWrapper')
                    ];
                }
            }

            if ((int) $object->get('reply_email') === 1) {
                if (!empty($object->get('reply_email_to'))) {
                    $attachments = [];

                    if (!empty($object->get('reply_email_attachment'))) {
                        $attachments[] = $this->getMediaSourceBasePath() . $object->get('reply_email_attachment');
                    }

                    $plugins['emailReply'] = [
                        'emailToField'  => 'email',
                        'emailFrom'     => $this->modx->getOption('emailsender'),
                        'emailReply'    => $object->get('reply_email_from') ?: $this->modx->getOption('emailsender'),
                        'subject'       => $object->get('reply_email_subject') ?: $object->get('name'),
                        'placeholders'  => [
                            'content'       => $object->get('reply_email_content')
                        ],
                        'attachments'   => $attachments,
                        'tpl'           => $this->getProperty('tplEmailReply') ?: $this->getProperty('tplEmail'),
                        'tplWrapper'    => $this->getProperty('tplEmailWrapper')
                    ];
                }
            }

            $plugins['FormBuilderFormRender'] = [];

            return $this->modx->runSnippet('Form', array_merge($this->getProperties(), [
                'form'      => $object->get('id'),
                'submit'    => $submit,
                'validator' => $validator,
                'plugins'   => $plugins
            ]));
        }

        return '';
    }
}
