<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

abstract class FormBuilderManagerController extends modExtraManagerController
{
    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('formbuilder', 'FormBuilder', $this->modx->getOption('formbuilder.core_path', null, $this->modx->getOption('core_path') . 'components/formbuilder/') . 'model/formbuilder/');

        $this->addCss($this->modx->formbuilder->config['css_url'] . 'mgr/formbuilder.css');

        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/formbuilder.js');

        $this->addJavascript($this->modx->formbuilder->config['js_url'] . 'mgr/extras/extras.js');

        $this->addHtml('<script type="text/javascript">
            Ext.onReady(function() {
                MODx.config.help_url = "' . $this->modx->formbuilder->getHelpUrl() . '";
        
                FormBuilder.config = ' . $this->modx->toJSON(array_merge($this->modx->formbuilder->config, [
                    'branding_url'          => $this->modx->formbuilder->getBrandingUrl(),
                    'branding_url_help'     => $this->modx->formbuilder->getHelpUrl()
                ])) . ';
            });
        </script>');

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getLanguageTopics()
    {
        return $this->modx->formbuilder->config['lexicons'];
    }

    /**
     * @access public.
     * @returns Boolean.
     */
    public function checkPermissions()
    {
        return $this->modx->hasPermission('formbuilder');
    }
}

class IndexManagerController extends FormBuilderManagerController
{
    /**
     * @access public.
     * @return String.
     */
    public static function getDefaultController()
    {
        return 'home';
    }
}
