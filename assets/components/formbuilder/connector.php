<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(dirname(dirname(__DIR__))) . '/config.core.php';

require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$modx->getService('formbuilder', 'FormBuilder', $modx->getOption('formbuilder.core_path', null, $modx->getOption('core_path') . 'components/formbuilder/') . 'model/formbuilder/');

if ($modx->formbuilder instanceof FormBuilder) {
    $modx->request->handleRequest([
        'processors_path'   => $modx->formbuilder->config['processors_path'],
        'location'          => ''
    ]);
}
