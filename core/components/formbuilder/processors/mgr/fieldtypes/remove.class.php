<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFieldTypeRemoveProcessor extends modObjectRemoveProcessor
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

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function afterRemove()
    {
        $criteria = $this->modx->newQuery('FormBuilderFormField', [
            'field_type_id' => $this->object->get('id')
        ]);

        foreach ($this->modx->getCollection('FormBuilderFormField', $criteria) as $object) {
            $object->remove();
        }

        return parent::afterRemove();
    }
}

return 'FormBuilderFieldTypeRemoveProcessor';
