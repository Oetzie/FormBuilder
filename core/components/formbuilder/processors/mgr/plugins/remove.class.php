<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderPluginRemoveProcessor extends modObjectRemoveProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'FormBuilderPlugin';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['formbuilder:default', 'formbuilder:plugins'];

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'formbuilder.plugin';

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
        $criteria = $this->modx->newQuery('FormBuilderFormPlugin', [
            'plugin_id' => $this->object->get('id')
        ]);

        foreach ($this->modx->getCollection('FormBuilderFormPlugin', $criteria) as $object) {
            $object->remove();
        }

        $criteria = $this->modx->newQuery('FormBuilderFieldType', [
            'plugin_id' => $this->object->get('id')
        ]);

        foreach ($this->modx->getCollection('FormBuilderFieldType', $criteria) as $object) {
            $object->set('plugin_id', 0);
            $object->save();
        }

        return parent::afterRemove();
    }
}

return 'FormBuilderPluginRemoveProcessor';
