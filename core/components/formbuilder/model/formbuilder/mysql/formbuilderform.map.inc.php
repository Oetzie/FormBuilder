<?php

/**
 * Form Builder
 *
 * Copyright 2021 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$xpdo_meta_map['FormBuilderForm'] = [
    'package'       => 'formbuilder',
    'version'       => '1.0',
    'table'         => 'formbuilder_form',
    'extends'       => 'xPDOSimpleObject',
    'tableMeta'     => [
        'engine'        => 'InnoDB'
    ],
    'fields'        => [
        'id'                        => null,
        'name'                      => null,
        'active'                    => null,
        'active_from'               => null,
        'active_till'               => null,
        'success_action'            => null,
        'success_resource'          => null,
        'success_message'           => null,
        'save'                      => null,
        'email'                     => null,
        'email_to'                  => null,
        'email_from'                => null,
        'email_subject'             => null,
        'email_content'             => null,
        'reply_email'               => null,
        'reply_email_to'            => null,
        'reply_email_from'          => null,
        'reply_email_subject'       => null,
        'reply_email_content'       => null,
        'reply_email_attachment'    => null,
        'editedon'                  => null
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
        'name'          => [
            'dbtype'        => 'varchar',
            'precision'     => '75',
            'phptype'       => 'string',
            'null'          => false,
            'default'       => ''
        ],
        'active'        => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => 1
        ],
        'active_from'   => [
            'dbtype'        => 'timestamp',
            'phptype'       => 'timestamp',
            'null'          => false,
            'default'       => '0000-00-00 00:00:00'
        ],
        'active_till'   => [
            'dbtype'        => 'timestamp',
            'phptype'       => 'timestamp',
            'null'          => false,
            'default'       => '0000-00-00 00:00:00'
        ],
        'success_action'    => [
            'dbtype'        => 'varchar',
            'precision'     => '10',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => 'resource'
        ],
        'success_resource'  => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => true
        ],
        'success_message'   => [
            'dbtype'        => 'text',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'save'          => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => '0'
        ],
        'email'         => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => '0'
        ],
        'email_to'      => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'email_from'    => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'email_subject' => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'email_content' => [
            'dbtype'        => 'text',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'reply_email'   => [
            'dbtype'        => 'int',
            'precision'     => '1',
            'phptype'       => 'integer',
            'null'          => false,
            'default'       => '0'
        ],
        'reply_email_to'    => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => true
        ],
        'reply_email_from'  => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'reply_email_subject'   => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'reply_email_content' => [
            'dbtype'        => 'text',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
        ],
        'reply_email_attachment' => [
            'dbtype'        => 'varchar',
            'precision'     => '255',
            'phptype'       => 'string',
            'null'          => true,
            'default'       => ''
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
        'SuccessRsource'      => [
            'local'         => 'success',
            'class'         => 'modResource',
            'foreign'       => 'id',
            'owner'         => 'local',
            'cardinality'   => 'one'
        ]
    ]
];
