<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(__DIR__) . '/index.class.php';

class FormBuilderHomeManagerController extends FormBuilderManagerController
{
    /**
     * @access public.
     */
    public function loadCustomCssJs()
    {
        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/home.panel.js');

        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/widgets/forms.grid.js');

        $this->addLastJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/sections/home.js');
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
        return $this->modx->formbuilder->config['templates_path'] . 'home.tpl';
    }
}
