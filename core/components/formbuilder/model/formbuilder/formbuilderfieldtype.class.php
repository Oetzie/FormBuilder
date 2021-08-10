<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class FormBuilderFieldType extends xPDOSimpleObject
{
    const FIELD_TYPE_FIELD      = 'field';
    const FIELD_TYPE_SUBMIT     = 'submit';
    const FIELD_TYPE_RECAPTCHA  = 'recaptcha';
    const FIELD_TYPE_UPLOAD     = 'field_upload';
    const FIELD_TYPE_EMAIL      = 'field_email';

    /**
     * @access public.
     * @return String.
     */
    public function getName()
    {
        $name = $this->get('name');

        if (!empty($name)) {
            $key        = 'formbuilder.field_type_' . strtolower($name);
            $lexicon    = $this->xpdo->lexicon($key);

            if ($key !== $lexicon) {
                $name = $lexicon;
            }
        }

        return $name;
    }

    /**
     * @access public.
     * @return Boolean.
     */
    public function isSubmit()
    {
        return $this->get('type') === self::FIELD_TYPE_SUBMIT;
    }

    /**
     * @access public.
     * @return Boolean.
     */
    public function isRecaptcha()
    {
        return $this->get('type') === self::FIELD_TYPE_RECAPTCHA;
    }

    /**
     * @access public.
     * @return Boolean.
     */
    public function isField()
    {
        return in_array($this->get('type'), [self::FIELD_TYPE_FIELD, self::FIELD_TYPE_UPLOAD, self::FIELD_TYPE_EMAIL], true);
    }

    /**
     * @access public.
     * @return Boolean.
     */
    public function isFieldUpload()
    {
        return $this->get('type') === self::FIELD_TYPE_UPLOAD;
    }

    /**
     * @access public.
     * @return Boolean.
     */
    public function isFieldEmail()
    {
        return $this->get('type') === self::FIELD_TYPE_EMAIL;
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getValidation()
    {
        $validation = [];

        if (!empty($this->get('validate'))) {
            $validate = json_decode($this->get('validate'), true);

            if ($validate) {
                $validation = array_merge($validation, $validate);
            }
        }

        return $validation;
    }

    /**
     * @access public.
     * @return Integer.
     */
    public function getMenuIndex()
    {
        $criteria = $this->xpdo->newQuery('FormBuilderFieldType');

        $criteria->sortby('menuindex', 'DESC');
        $criteria->limit(1);

        $object = $this->xpdo->getObject('FormBuilderFieldType', $criteria);

        if ($object) {
            return (int) $object->get('menuindex') + 1;
        }

        return 0;
    }
}
