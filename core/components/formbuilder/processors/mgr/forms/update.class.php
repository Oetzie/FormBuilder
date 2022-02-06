<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormUpdateProcessor extends modObjectUpdateProcessor
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

        if ($this->getProperty('active') === null) {
            $this->setProperty('active', 0);
        }

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSet()
    {
        if (empty($this->getProperty('active_from'))) {
            $this->object->set('active_from', '0000-00-00 00:00:00');
        }

        if (empty($this->getProperty('active_till'))) {
            $this->object->set('active_till', '0000-00-00 00:00:00');
        }

        return parent::beforeSet();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSave()
    {
        $criteria = [
            'id:!=' => $this->object->get('id'),
            'name'  => $this->object->get('name')
        ];

        if ($this->doesAlreadyExist($criteria)) {
            $this->addFieldError('name', $this->modx->lexicon('formbuilder.form_error_exists'));
        }

        return parent::beforeSave();
    }
}

return 'FormBuilderFormUpdateProcessor';
