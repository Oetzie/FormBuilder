<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once __DIR__ . '/formbuilder.class.php';

class FormBuilderSnippets extends FormBuilder
{
    /**
     * @access public.
     * @var Array.
     */
    public $properties = [];

    /**
     * @access public.
     * @param String $key.
     * @param Mixed $value.
     */
    public function setProperty($key, $value)
    {
        $this->properties[$key] = $value;
    }

    /**
     * @access public.
     * @param String $key.
     * @param Mixed $default.
     * @return Mixed.
     */
    public function getProperty($key, $default = null)
    {
        if (isset($this->properties[$key])) {
            return $this->properties[$key];
        }

        return $default;
    }

    /**
     * @access public.
     * @param Array $properties.
     */
    public function setProperties(array $properties = [])
    {
        foreach ($properties as $key => $value) {
            $this->setProperty($key, $value);
        }
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * @access public.
     * @param Array $properties.
     * @return Array.
     */
    public function getFormattedProperties(array $properties = [])
    {
        foreach (['validator', 'validatorMessages', 'plugins'] as $key) {
            if (isset($properties[$key]) && !is_array($properties[$key])) {
                $properties[$key] = json_decode($properties[$key], true);
            }
        }

        foreach (['usePdoTools', 'usePdoElementsPath'] as $key) {
            if (isset($properties[$key]) && !is_bool($properties[$key])) {
                $properties[$key] = $properties[$key] === 'true' || $properties[$key] === '1';
            }
        }

        return $properties;
    }

    /**
     * @access public.
     * @param String $name.
     * @param Array $properties.
     * @return String.
     */
    public function getChunk($name, array $properties = [])
    {
        $usePdoTools        = (bool) $this->getProperty('usePdoTools', false);
        $usePdoElementsPath = (bool) !$this->getProperty('usePdoElementsPath', false);

        return parent::getChunkTemplate($name, $properties, $usePdoTools, $usePdoElementsPath);
    }

    /**
     * @access public.
     * @param Integer $id.
     * @return Null|Object.
     */
    public function getForm($id)
    {
        $form = $this->modx->getObject('FormBuilderForm', [
            'id'        => $id,
            'active'    => 1
        ]);

        if ($form) {
            if (!in_array($form->get('active_from'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
                if (time() < strtotime($form->get('active_from'))) {
                    return null;
                }
            }

            if (!in_array($form->get('active_till'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
                if (time() > strtotime($form->get('active_till'))) {
                    return null;
                }
            }

            return $form;
        }

        return null;
    }
}
