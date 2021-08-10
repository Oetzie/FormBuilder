<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFieldTypeUpdateProcessor extends modObjectUpdateProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'FormBuilderFieldType';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['formbuilder:default', 'formbuilder:fieldtypes'];

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'formbuilder.field_type';

    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('formbuilder', 'FormBuilder', $this->modx->getOption('formbuilder.core_path', null, $this->modx->getOption('core_path') . 'components/formbuilder/') . 'model/formbuilder/');

        if ($this->getProperty('active') === null) {
            $this->setProperty('active', 0);
        }

        if ($this->getProperty('values') === null) {
            $this->setProperty('values', 0);
        }

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSave()
    {
        $this->object->set('fields', json_encode($this->getProperty('fields', [])));

        return parent::beforeSave();
    }
}

return 'FormBuilderFieldTypeUpdateProcessor';
