<?php

/**
 * Form Builder
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $modx =& $object->xpdo;
            $modx->addPackage('formbuilder', $modx->getOption('formbuilder.core_path', null, $modx->getOption('core_path') . 'components/formbuilder/') . 'model/');

            $manager = $modx->getManager();

            $manager->createObjectContainer('FormBuilderForm');
            $manager->createObjectContainer('FormBuilderFormField');
            $manager->createObjectContainer('FormBuilderFormPlugin');
            $manager->createObjectContainer('FormBuilderFieldType');
            $manager->createObjectContainer('FormBuilderPlugin');

            break;
    }
}

return true;
