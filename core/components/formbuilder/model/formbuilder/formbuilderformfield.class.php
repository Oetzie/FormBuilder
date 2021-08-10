<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormField extends xPDOSimpleObject
{
    /**
     * @access public.
     * @return Null|Object.
     */
    public function getFieldType()
    {
        return $this->xpdo->getObject('FormBuilderFieldType', [
            'id' => $this->get('field_type_id')
        ]);
    }

    /**
     * @access public.
     * @return String.
     */
    public function getLabel()
    {
        if ((int) $this->get('required') === 1) {
            return $this->get('label') . ' *';
        }

        return $this->get('label');
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getValues()
    {
        $values = [];

        if (!empty($this->get('placeholder'))) {
            $values[] = [
                'value'     => '',
                'label'     => $this->get('placeholder'),
                'active'    => 1
            ];
        }

        if ($data = json_decode($this->get('values'), true)) {
            $values += $data;
        }

        return $values;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getValidation()
    {
        $validation = [];

        if ((int) $this->get('required') === 1) {
            $validation['required'] = true;
        }

        if (!empty($this->get('validate'))) {
            $validate = json_decode($this->get('validate'), true);

            if ($validate) {
                $validation = array_merge($validation, $validate);
            }
        }

        return $validation;
    }

    /**
     * @access public.
     * @return Object|Null.
     */
    public function getPlugin()
    {
        if ($fieldType = $this->getFieldType()) {
            return $this->xpdo->getObject('FormBuilderPlugin', [
                'id'        => $fieldType->get('plugin_id'),
                'active'    => 1
            ]);
        }

        return null;
    }

    /**
     * @access public.
     * @return Integer.
     */
    public function getMenuIndex()
    {
        $criteria = $this->xpdo->newQuery('FormBuilderFormField', [
            'form_id' => $this->get('form_id')
        ]);

        $criteria->sortby('menuindex', 'DESC');
        $criteria->limit(1);

        $object = $this->xpdo->getObject('FormBuilderFormField', $criteria);

        if ($object) {
            return (int) $object->get('menuindex') + 1;
        }

        return 0;
    }
}
