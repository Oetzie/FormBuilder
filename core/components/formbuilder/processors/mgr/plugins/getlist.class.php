<?php

/**
 * Form
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderPluginGetListProcessor extends modObjectGetListProcessor
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
    public $defaultSortField = 'name';

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortDirection = 'ASC';

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
        $query = $this->getProperty('query');

        if (!empty($query)) {
            $criteria->where([
                'name:LIKE'         => '%' . $query . '%',
                'description:LIKE'  => '%' . $query . '%'
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
        $array = array_merge($object->toArray(), [
            'name_formatted'        => $object->getName(),
            'description_formatted' => $object->getDescription()
        ]);

        if (in_array($object->get('editedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
            $array['editedon'] = '';
        } else {
            $array['editedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('editedon')));
        }

        return $array;
    }

    /**
     * @access public.
     * @param Array $list.
     * @return Array.
     */
    public function beforeIteration(array $list)
    {
        if ($this->getProperty('combo') === 'true' && $this->getProperty('emptyValue') === 'true') {
            array_unshift($list, [
                'id'                => 0,
                'name'              => $this->modx->lexicon('formbuilder.field_type_plugin_empty'),
                'name_formatted'    => $this->modx->lexicon('formbuilder.field_type_plugin_empty')
            ]);
        }
        return $list;
    }
}

return 'FormBuilderPluginGetListProcessor';
