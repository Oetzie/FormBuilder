<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormFieldAddProcessor extends modObjectCreateProcessor
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

        if (empty($this->getProperty('label'))) {
            $this->setProperty('label', $this->modx->lexicon('formbuilder.new_field'));
        }

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSave()
    {
        $this->object->set('menuindex', $this->object->getMenuIndex());

        return parent::beforeSave();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function afterSave()
    {
        if (empty($this->object->get('key'))) {
            $this->object->set('key', 'field_' . $this->object->get('id'));
        }

        $this->object->save();

        return parent::afterSave();
    }
}

return 'FormBuilderFormFieldAddProcessor';
