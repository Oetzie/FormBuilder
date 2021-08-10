<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$xpdo_meta_map['FormBuilderFormField'] = [
    'package'       => 'formbuilder',
    'version'       => '1.0',
    'table'         => 'formbuilder_form_field',
    'extends'       => 'xPDOSimpleObject',
    'tableMeta'     => [
        'engine'        => 'InnoDB'
    ],
    'fields'        => [
        'id'            => null,
        'form_id'       => null,
        'field_type_id' => null,
        'key'           => null,
        'label'         => null,
        'description'   => null,
        'placeholder'   => null,
        'values'        => null,
        'required'      => null,
        'validate'      => null,
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
        'form_id'       => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false
        ],
        'field_type_id' => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false
        ],
        'key'           => [
            'dbtype'        => 'varchar',
            'precision'     => '75',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'label'         => [
            'dbtype'        => 'varchar',
            'precision'     => '75',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'description'   => [
            'dbtype'        => 'text',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'placeholder'   => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'values'        => [
            'dbtype'        => 'text',
            'phptype'       => 'string',
            'null'          => true
        ],
        'required'      => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => 0
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
        'Form'          => [
            'local'         => 'form_id',
            'class'         => 'FormBuilderForm',
            'foreign'       => 'id',
            'owner'         => 'foreign',
            'cardinality'   => 'one'
        ],
        'FieldType'     => [
            'local'         => 'field_type_id',
            'class'         => 'FormBuilderFieldType',
            'foreign'       => 'id',
            'owner'         => 'foreign',
            'cardinality'   => 'one'
        ]
    ]
];
