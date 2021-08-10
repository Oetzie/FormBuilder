<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormFieldUpdateProcessor extends modObjectUpdateProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'FormBuilderFormField';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['formbuilder:default', 'formbuilder:fieldtypes'];

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'formbuilder.form_field';

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

        if ($this->getProperty('required') === null) {
            $this->setProperty('required', 0);
        }

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSet()
    {
        $this->setProperty('key', strtolower(str_replace([' ', '-'], '_', $this->getProperty('key'))));

        return parent::beforeSet();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSave()
    {
        $criteria = [
            'id:!='     => $this->object->get('id'),
            'key'       => $this->object->get('key'),
            'form_id'   => $this->object->get('form_id')
        ];

        if (!preg_match('/^([a-zA-Z0-9\_\-]+)$/i', $this->object->get('key'))) {
            $this->addFieldError('key', $this->modx->lexicon('formbuilder.field_error_character'));
        } else if ($this->doesAlreadyExist($criteria)) {
            $this->addFieldError('key', $this->modx->lexicon('formbuilder.field_error_exists'));
        }

        return parent::beforeSave();
    }
}

return 'FormBuilderFormFieldUpdateProcessor';
