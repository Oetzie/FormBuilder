<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormPluginGetListProcessor extends modObjectGetListProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'FormBuilderFormPlugin';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['formbuilder:default', 'formbuilder:plugins'];

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortField = 'FormPlugin.menuindex';

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortDirection = 'ASC';

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'formbuilder.form_plugin';

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
        $criteria->setClassAlias('FormPlugin');

        $criteria->select($this->modx->getSelectColumns('FormBuilderFormPlugin', 'FormPlugin'));
        $criteria->select($this->modx->getSelectColumns('FormBuilderPlugin', 'Plugin', 'plugin_', ['name', 'description']));

        $criteria->leftJoin('FormBuilderPlugin', 'Plugin');

        $formID = $this->getProperty('form_id');

        if (!empty($formID)) {
            $criteria->where([
                'FormPlugin.form_id' => $formID
            ]);
        }

        $query = $this->getProperty('query');

        if (!empty($query)) {
            $criteria->where([
                'Plugin.name:LIKE'             => '%' . $query . '%',
                'OR:Plugin.description:LIKE'   => '%' . $query . '%'
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
            'plugin_name'           => '',
            'plugin_description'    => '',
        ]);

        if ($plugin = $object->getPlugin()) {
            $array['plugin_name']           = $plugin->getName();
            $array['plugin_description']    = $plugin->getDescription();
        }

        if (in_array($object->get('editedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
            $array['editedon'] = '';
        } else {
            $array['editedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('editedon')));
        }

        return $array;
    }
}

return 'FormBuilderFormPluginGetListProcessor';
