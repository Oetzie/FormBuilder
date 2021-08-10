<?php
/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$class = $modx->loadClass('FormBuilderSnippetFormRender', $modx->getOption('formbuilder.core_path', null, $modx->getOption('core_path') . 'components/formbuilder/') . 'model/formbuilder/snippets/', false, true);

if ($class) {
    $instance = new $class($modx);

    if ($instance instanceof FormBuilderSnippets) {
        return $instance->run($event, $properties, $form);
    }
}

return '';