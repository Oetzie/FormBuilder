<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormFieldGetListProcessor extends modObjectGetListProcessor
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
    public $defaultSortField = 'FormField.menuindex';

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortDirection = 'ASC';

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

        $this->setDefaultProperties([
            'dateFormat' => $this->modx->getOption('manager_date_format') . ', ' . $this->modx->getOption('manager_time_format')
        ]);

        return parent::initialize();
    }

    /**
     * @access public.
     * @param xPDOQuery $criteria.
     * @return xPDOQuery.
     */
    public function prepareQueryBeforeCount(xPDOQuery $criteria)
    {
        $criteria->setClassAlias('FormField');

        $criteria->select($this->modx->getSelectColumns('FormBuilderFormField', 'FormField'));
        $criteria->select($this->modx->getSelectColumns('FormBuilderFieldType', 'FieldType', 'field_type_', ['icon']));

        $criteria->innerJoin('FormBuilderFieldType', 'FieldType');

        $formID = $this->getProperty('form_id');

        if (!empty($formID)) {
            $criteria->where([
                'FormField.form_id' => $formID
            ]);
        }

        return $criteria;
    }

    /**
     * @access public.
     * @param xPDOObject $object.
     * @return Array.
     */
    public function prepareRow(xPDOObject $object)
    {
        $fieldType = $object->getFieldType();

        if ($fieldType) {
            $array = array_merge($object->toArray(), [
                'label_formatted'   => $object->getLabel(),
                'field_type_name'   => $fieldType->getName()
            ]);

            if (in_array($object->get('editedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
                $array['editedon'] = '';
            } else {
                $array['editedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('editedon')));
            }

            if ($this->getProperty('emailOnly') !== 'true' || $fieldType->isFieldEmail()) {
                return $array;
            }
        }

        return [];
    }
}

return 'FormBuilderFormFieldGetListProcessor';
