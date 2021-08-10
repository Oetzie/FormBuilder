<form novalidate action="{$action}" method="{$method}" class="form  {!empty($active) ? 'form-active' : ''}" enctype="multipart/form-data">
    {$error_message}
    {$success_message}
    {$plugins['FormBuilderFormRender']['output']}
</form>