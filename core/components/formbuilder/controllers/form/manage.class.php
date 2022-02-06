<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(dirname(__DIR__)) . '/index.class.php';

class FormBuilderFormManageManagerController extends FormBuilderManagerController
{
    /**
     * @access public.
     * @var Null|Object.
     */
    public $object = null;

    /**
     * @access public.
     */
    public function loadCustomCssJs()
    {
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/form/form.panel.js');

        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/form/form-fields.grid.js');
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/form/form-field-values.grid.js');
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/form/form-plugins.grid.js');
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/form/form-plugin-properties.grid.js');

        $this->addLastJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/sections/form/form.js');

        $this->addHtml('<script type="text/javascript">
            Ext.onReady(function() {
                FormBuilder.config.record       = ' . $this->modx->toJSON($this->getForm()) . ';
                FormBuilder.config.field_types  = ' . $this->modx->toJSON($this->getFieldTypes()) . ';
            });
        </script>');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('formbuilder.form_manage');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getTemplateFile()
    {
        return $this->modx->formbuilder->config['templates_path'] . 'form/form.tpl';
    }

    /**
     * @access public.
     * @param Array $properties.
     * @return Mixed.
     */
    public function process(array $properties = [])
    {
        $this->setForm($properties);

        if (!$this->getForm()) {
            return $this->failure($this->modx->lexicon('formbuilder.form_not_exists', [
                'id' => $properties['id']
            ]));
        }
    }

    /**
     * @access public.
     * @param Array $properties.
     */
    public function setForm(array $properties = [])
    {
        $this->object = $this->modx->getObject('FormBuilderForm', [
            'id' => $properties['id']
        ]);
    }

    /**
     * @access public.
     * @return Null|Array.
     */
    public function getForm()
    {
        if ($this->object !== null) {
            $array = array_merge($this->object->toArray(), [
                'success_resource_formatted' => ''
            ]);

            if (in_array($this->object->get('active_from'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
                $array['active_from'] = '';
            } else {
                $array['active_from'] = $this->object->get('active_from');
            }

            if (in_array($this->object->get('active_till'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
                $array['active_till'] = '';
            } else {
                $array['active_till'] = $this->object->get('active_till');
            }

            if ($resource = $this->object->getSuccessResource()) {
                $array['success_resource_formatted'] = $resource->get('pagetitle') . ($this->modx->hasPermission('tree_show_resource_ids') ? ' (' . $resource->get('id') . ')' : '');
            }

            return $array;
        }

        return null;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getFieldTypes()
    {
        $fieldTypes = [];

        $criteria = $this->modx->newQuery('FormBuilderFieldType', [
            'active' => 1
        ]);

        $criteria->sortby('menuindex', 'ASC');

        foreach ($this->modx->getCollection('FormBuilderFieldType', $criteria) as $fieldType) {
            if (!$fieldType->isRecaptcha()) {
                $fieldTypes[$fieldType->get('id')] = [
                    'id'                => $fieldType->get('id'),
                    'name'              => $fieldType->get('name'),
                    'name_formatted'    => $fieldType->getName(),
                    'values'            => $fieldType->get('values'),
                    'icon'              => $fieldType->get('icon'),
                    'fields'            => json_decode($fieldType->get('fields'), true),
                    'menuindex'         => $fieldType->get('menuindex')
                ];
            }
        }

        return $fieldTypes;
    }
}
