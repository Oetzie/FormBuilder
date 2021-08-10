{extends 'file:elements/chunks/forms/email-wrapper.tpl'}

{block 'content'}
    <p><strong>{$subject} | {$_modx->config['site_name']}</strong></p>
    {$content}
{/block}