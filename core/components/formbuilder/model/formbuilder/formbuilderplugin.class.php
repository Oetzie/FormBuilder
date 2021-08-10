<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderPlugin extends xPDOSimpleObject
{
    /**
     * @access public.
     * @return String.
     */
    public function getName()
    {
        $name = $this->get('name');

        if (!empty($name)) {
            $key        = 'formbuilder.plugin_' . strtolower($name);
            $lexicon    = $this->xpdo->lexicon($key);

            if ($key !== $lexicon) {
                $name = $lexicon;
            }
        }

        return $name;
    }

    /**
     * @access public.
     * @return String.
     */
    public function getDescription()
    {
        $description = $this->get('description');

        if (empty($description)) {
            $key        = 'formbuilder.plugin_' . strtolower($this->get('name')) . '_desc';
            $lexicon    = $this->xpdo->lexicon($key);

            if ($key !== $lexicon) {
                $description = $lexicon;
            }
        }

        return $description;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getProperties()
    {
        $data = [];

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
