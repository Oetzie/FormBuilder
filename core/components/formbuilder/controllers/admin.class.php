<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(__DIR__) . '/index.class.php';

class FormBuilderAdminManagerController extends FormBuilderManagerController
{
    /**
     * @access public.
     */
    public function loadCustomCssJs()
    {
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/admin.panel.js');

        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/field-types.grid.js');
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/plugins.grid.js');
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/plugin-properties.grid.js');

        $this->addLastJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/sections/admin.js');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('formbuilder');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getTemplateFile()
    {
        return $this->modx->formbuilder->config['templates_path'] . 'admin.tpl';
    }

    /**
     * @access public.
     * @returns Boolean.
     */
    public function checkPermissions()
    {
        return $this->modx->hasPermission('formbuilder_admin');
    }
}
