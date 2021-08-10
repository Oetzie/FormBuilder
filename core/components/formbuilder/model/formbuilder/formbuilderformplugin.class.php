<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFormPlugin extends xPDOSimpleObject
{
    /**
     * @access public.
     * @return Null|Object.
     */
    public function getPlugin()
    {
        return $this->xpdo->getObject('FormBuilderPlugin', [
            'id' => $this->get('plugin_id')
        ]);
    }

    /**
     * @access public.
     * @return Integer.
     */
    public function getMenuIndex()
    {
        $criteria = $this->xpdo->newQuery('FormBuilderFormPlugin', [
            'form_id' => $this->get('form_id')
        ]);

        $criteria->sortby('menuindex', 'DESC');
        $criteria->limit(1);

        $object = $this->xpdo->getObject('FormBuilderFormPlugin', $criteria);

        if ($object) {
            return (int) $object->get('menuindex') + 1;
        }

        return 0;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getProperties()
    {
        $data = [];

        if ($plugin = $this->getPlugin()) {
            $data = $plugin->getProperties();
        }

        $properties = json_decode($this->get('properties'), true);

        if ($properties) {
            foreach ((array) $properties as $property) {
                if (isset($property['key'], $property['value'])) {
                    $data[$property['key']] = $property['value'];
                }
            }
        }

        return $data;
    }
}
