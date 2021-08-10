<?php

/**
 * Form
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderPluginPropertiesGetListProcessor extends modObjectProcessor
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
     * @return String.
     */
    public function process()
    {
        $data = [];

        $object = $this->modx->getObject($this->classKey, [
            'id' => $this->getProperty('plugin')
        ]);

        if ($object) {
            $properties = json_decode($object->get('properties'), true);

            if ($properties) {
                foreach ((array) $properties as $property) {
                    $description = $property['description'];

                    if (empty($description)) {
                        $lexiconKey     = 'formbuilder.plugin_' . strtolower($object->get('name')) . '_property_' . strtolower($property['key']);
                        $lexiconValue   = $this->modx->lexicon($lexiconKey);

                        if ($lexiconKey !== $lexiconValue) {
                            $description = $lexiconValue;
                        }
                    }

                    $data[] = [
                        'key'           => $property['key'],
                        'value'         => $property['value'],
                        'description'   => $description
                    ];
                }
            }
        }

        return $this->outputArray($data);
    }
}

return 'FormBuilderPluginPropertiesGetListProcessor';
