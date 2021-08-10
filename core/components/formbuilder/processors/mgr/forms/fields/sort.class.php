<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormFieldSortProcessor extends modObjectProcessor
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

        return parent::initialize();
    }

    /**
     * @access public
     * @return Mixed.
     */
    public function process()
    {
        $index = 0;

        foreach ((array) explode(',', $this->getProperty('sort')) as $id) {
            $object = $this->modx->getObject($this->classKey, [
                'id' => $id
            ]);

            if ($object) {
                $object->fromArray([
                    'menuindex' => $index
                ]);

                if ($object->save()) {
                    $index++;
                }
            }
        }

        return $this->success();
    }
}

return 'FormBuilderFormFieldSortProcessor';
