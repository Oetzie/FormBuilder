<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$xpdo_meta_map['FormBuilderFieldType'] = [
    'package'       => 'formbuilder',
    'version'       => '1.0',
    'table'         => 'formbuilder_field_type',
    'extends'       => 'xPDOSimpleObject',
    'tableMeta'     => [
        'engine'        => 'InnoDB'
    ],
    'fields'        => [
        'id'            => null,
        'type'          => null,
        'name'          => null,
        'values'        => null,
        'tpl'           => null,
        'tpl_values'    => null,
        'icon'          => null,
        'fields'        => null,
        'validate'      => null,
        'plugin_id'     => null,
        'menuindex'     => null,
        'active'        => null,
        'editedon'      => null
    ],
    'fieldMeta'     => [
        'id'            => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false,
            'index'         => 'pk',
            'generated'     => 'native'
        ],
        'type'          => [
            'dbtype'        => 'varchar',
            'precision'     => '15',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'name'          => [
            'dbtype'        => 'varchar',
            'precision'     => '75',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'values'        => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => 0
        ],
        'tpl'          => [
            'dbtype'        => 'varchar',
            'precision'     => '150',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'tpl_values'    => [
            'dbtype'        => 'varchar',
            'precision'     => '150',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'icon'          => [
            'dbtype'        => 'varchar',
            'precision'     => '15',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'fields'        => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => '[]'
        ],
        'validate'      => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => '{}'
        ],
        'menuindex'     => [
            'dbtype'        => 'int',
            'precision'     => '3',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => 1
        ],
        'plugin_id'     => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => true,
            'default'       => 0
        ],
        'active'        => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => 1
        ],
        'editedon'      => [
            'dbtype'        => 'timestamp',
            'phptype'       => 'timestamp',
            'null'          => false
        ]
    ],
    'indexes'       => [
        'PRIMARY'       => [
            'alias'         => 'PRIMARY',
            'primary'       => true,
            'unique'        => true,
            'columns'       => [
                'id'            => [
                    'collation'     => 'A',
                    'null'          => false
                ]
            ]
        ]
    ],
    'aggregates'    =>  [
        'Fields'        => [
            'local'         => 'id',
            'class'         => 'FormBuilderFormField',
            'foreign'       => 'field_type_id',
            'owner'         => 'foreign',
            'cardinality'   => 'many'
        ],
        'Plugin'        => [
            'local'         => 'id',
            'class'         => 'FormBuilderPlugin',
            'foreign'       => 'plugin_id',
            'owner'         => 'foreign',
            'cardinality'   => 'one'
        ]
    ]
];
