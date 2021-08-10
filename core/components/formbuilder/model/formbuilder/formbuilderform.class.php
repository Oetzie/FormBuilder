<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderForm extends xPDOSimpleObject
{
    /**
     * @access public.
     * @return Object|Null.
     */
    public function getSuccessResource()
    {
        return $this->xpdo->getObject('modResource', [
            'id' => $this->get('success_resource')
        ]);
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getFields()
    {
        $criteria = $this->xpdo->newQuery('FormBuilderFormField', [
            'form_id'   => $this->get('id'),
            'active'    => 1
        ]);

        $criteria->sortby('menuindex', 'ASC');

        return $this->xpdo->getCollection('FormBuilderFormField', $criteria);
    }

    /**
     * @access public.
     * @param Array $fields.
     * @return Integer.
     */
    public function getSubmitFieldIndex(array $fields = [])
    {
        if (empty($fields)) {
            $fields = $this->getFields();
        }

        foreach (array_values($fields) as $key => $field) {
            if ($fieldType = $field->getFieldType()) {
                if ($fieldType->isSubmit()) {
                    return $key;
                }
            }
        }

        return 0;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getPlugins()
    {
        $criteria = $this->xpdo->newQuery('FormBuilderFormPlugin');

        $criteria->select($this->xpdo->getSelectColumns('FormBuilderFormPlugin', 'FormBuilderFormPlugin'));
        $criteria->select($this->xpdo->getSelectColumns('FormBuilderPlugin', 'FormBuilderPlugin', '', ['snippet']));

        $criteria->innerJoin('FormBuilderPlugin', 'FormBuilderPlugin', [
            'FormBuilderFormPlugin.plugin_id = FormBuilderPlugin.id'
        ]);

        $criteria->where([
            'FormBuilderFormPlugin.form_id' => $this->get('id'),
            'FormBuilderFormPlugin.active'  => 1,
            'FormBuilderPlugin.active'      => 1
        ]);

        $criteria->sortby('FormBuilderFormPlugin.menuindex', 'ASC');

        return $this->xpdo->getCollection('FormBuilderFormPlugin', $criteria);
    }
}
