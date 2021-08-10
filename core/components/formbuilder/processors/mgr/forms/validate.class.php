<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormValidateProcessor extends modObjectProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'FormBuilderForm';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['formbuilder:default'];

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'formbuilder.form';

    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('formbuilder', 'FormBuilder', $this->modx->getOption('formbuilder.core_path', null, $this->modx->getOption('core_path') . 'components/formbuilder/') . 'model/formbuilder/');

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function process()
    {
        $object = $this->modx->getObject($this->classKey, [
            'id' => $this->getProperty('id')
        ]);

        if ($object) {
            $output = [
                'placeholders'  => [],
                'submit'        => false
            ];

            foreach ((array) $object->getFields() as $field) {
                $fieldType = $field->getFieldType();

                if ($fieldType) {
                    if ($fieldType->isSubmit()) {
                        $output['submit'] = true;
                    } else if ($fieldType->isField()) {
                        $output['placeholders'][] = $field->get('key');
                    }
                }
            }

            return [
                'success'   => true,
                'object'    => $output
            ];
        }

        return [
            'success' => true
        ];
    }
}

return 'FormBuilderFormValidateProcessor';
