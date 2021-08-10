<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormRemoveProcessor extends modObjectRemoveProcessor
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
    public function afterRemove()
    {
        $criteria = $this->modx->newQuery('FormBuilderFormField', [
            'form_id' => $this->object->get('id')
        ]);

        foreach ($this->modx->getCollection('FormBuilderFormField', $criteria) as $object) {
            $object->remove();
        }

        $criteria = $this->modx->newQuery('FormBuilderFormPlugin', [
            'form_id' => $this->object->get('id')
        ]);

        foreach ($this->modx->getCollection('FormBuilderFormPlugin', $criteria) as $object) {
            $object->remove();
        }

        return parent::afterRemove();
    }
}

return 'FormBuilderFormRemoveProcessor';
