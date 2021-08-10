<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(__DIR__) . '/formbuildersnippets.class.php';

class FormBuilderSnippetFormRender extends FormBuilderSnippets
{
    /**
     * @access public.
     * @var Array.
     */
    public $properties = [

    ];

    /**
     * @access public.
     * @param String $event.
     * @param Array $properties.
     * @param Object $form.
     * @return Boolean.
     */
    public function run($event, array $properties = [], $form)
    {
        if (in_array($event, [FormEvents::BEFORE_POST, FormEvents::VALIDATE_POST], true)) {
            $this->setProperties($this->getFormattedProperties([
                'usePdoTools'           => $form->getProperty('usePdoTools'),
                'usePdoElementsPath'    => $form->getProperty('usePdoElementsPath')
            ]));

            $object = $this->getForm($form->getProperty('form'));

            if ($object) {
                $output = [];
                $fields = $object->getFields();
                $values = $form->getCollection()->getValues();

                if ($form->getEvents()->hasPlugin('recaptcha')) {
                    $fieldType = $this->modx->getObject('FormBuilderFieldType', [
                        'type' => FormBuilderFieldType::FIELD_TYPE_RECAPTCHA
                    ]);

                    if ($fieldType) {
                        $field = $this->modx->newObject('FormBuilderFormField', [
                            'form_id'       => $object->get('id'),
                            'field_type_id' => $fieldType->get('id')
                        ]);

                        if ($index = $object->getSubmitFieldIndex($fields)) {
                            array_splice($fields, $index, 0, [$field]);
                        } else {
                            $fields[] = $field;
                        }
                    }
                }

                foreach ($fields as $field) {
                    if ($fieldType = $field->getFieldType()) {
                        $properties = array_merge($field->toArray(), $fieldType->toArray(), [
                            'value'     => $values[$field->get('key')] ?: '',
                            'error'     => '',
                            'errors'    => ''
                        ]);

                        if ($fieldType->isSubmit()) {
                            $properties['key'] = $form->getProperty('submit');
                        } else if ($fieldType->isRecaptcha()) {
                            $properties['key'] = 'recaptcha';

                            $value = $form->getEvents()->getValue($properties['key']);

                            if ($value['output']) {
                                $properties['value'] = $value['output'];
                            }
                        } else if ($fieldType->isField()) {
                            if ((int) $fieldType->get('values') === 1) {
                                $fieldValues        = $field->getValues();
                                $fieldValuesOutput  = [];

                                if (count($fieldValues) === 0) {
                                    $fieldValues[] = [
                                        'value'     => '1',
                                        'label'     => $field->getLabel(),
                                        'active'    => 1
                                    ];

                                    $properties['label'] = '';
                                }

                                foreach ($fieldValues as $fieldValue) {
                                    if (isset($fieldValue['value'], $fieldValue['active']) && (int) $fieldValue['active'] === 1) {
                                        $selected = false;

                                        if ($form->isMethod($form->getProperty('method'))) {
                                            if (is_array($properties['value'])) {
                                                $selected = in_array($fieldValue['value'], $properties['value'], true);
                                            } else {
                                                $selected = $fieldValue['value'] === $properties['value'];
                                            }
                                        } else {
                                            $selected = (int) $fieldValue['selected'] === 1;
                                        }

                                        $fieldValuesOutput[] = $this->getChunk($fieldType->get('tpl_values'), [
                                            'key'       => $field->get('key'),
                                            'value'     => $fieldValue['value'],
                                            'label'     => $fieldValue['label'] ?: $fieldValue['value'],
                                            'selected'  => $selected
                                        ]);
                                    }
                                }

                                $properties['values'] = implode(PHP_EOL, $fieldValuesOutput);
                            }
                        }

                        if ($errors = $form->getValidator()->getError($properties['key'])) {
                            $errors = $form->formatValidationError($errors);

                            $properties['error']    = $errors[0] ?: '';
                            $properties['errors']   = implode(PHP_EOL, $errors);
                        }

                        $output[] = $this->getChunk($fieldType->get('tpl'), $properties);
                    }
                }

                if ($event === FormEvents::VALIDATE_POST) {
                    if ($form->getEvents()->hasPlugin('email') || $form->getEvents()->hasPlugin('emailReply')) {
                        $fields             = [];
                        $attachmentFields   = [];
                        $values             = $form->getCollection()->getFormattedValues();

                        foreach ((array) $object->getFields() as $field) {
                            $fieldType = $field->getFieldType();

                            if ($fieldType) {
                                if ($fieldType->isField()) {
                                    $value = '';

                                    if (isset($values[$field->get('key')])) {
                                        $value = $values[$field->get('key')];
                                    }

                                    $fields[] = $this->getChunk($form->getProperty('tplEmailField'), [
                                        'label' => $field->get('label'),
                                        'value' => $values[$field->get('key') . '_formatted'] ?: $value
                                    ]);
                                }

                                if ($fieldType->isFieldUpload()) {
                                    $attachmentFields[] = $field->get('key');
                                }
                            }
                        }

                        if ($form->getEvents()->hasPlugin('email')) {
                            $form->getEvents()->updatePlugin('email', [
                                'subject'           => $this->getChunk('@INLINE ' . ($object->get('email_subject') ?: $object->get('name')), $values),
                                'placeholders'      => [
                                    'fields'            => $this->getChunk($form->getProperty('tplEmailFieldWrapper'), [
                                        'output'            => implode(PHP_EOL, $fields)
                                    ])
                                ],
                                'attachmentFields'   => $attachmentFields
                            ]);
                        }

                        if ($form->getEvents()->hasPlugin('emailReply')) {
                            $form->getEvents()->updatePlugin('emailReply', [
                                'subject'           => $this->getChunk('@INLINE ' . ($object->get('reply_email_subject') ?: $object->get('name')), $values),
                                'placeholders'      => [
                                    'fields'            => $this->getChunk($form->getProperty('tplEmailFieldWrapper'), [
                                        'output'            => implode(PHP_EOL, $fields)
                                    ])
                                ],
                                'attachmentFields'   => $attachmentFields
                            ]);
                        }
                    }
                }

                $form->getEvents()->setValue('FormBuilderFormRender', [
                    'output' => implode(PHP_EOL, $output)
                ]);
            }
        }

        return true;
    }
}
