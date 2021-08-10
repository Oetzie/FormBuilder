<div class="form-group {!empty($required) ? 'required' : ''} {!empty($error) ? 'form-group--error' : ''}">
    {if !empty($label)}
        <label for="{$key}">{$label} {!empty($required) ? '*' : ''}</label>
    {/if}

    <div class="form-control-wrapper">
        <textarea name="{$key}" id="{$key}" class="form-control form-control--textarea" {!empty($placeholder) ? 'placeholder="' ~ $placeholder ~ '"' : ''}>{$value}</textarea> {$error}
        {!empty($description) ? '<p class="help-block">' ~ $description ~ '</p>' : ''}
    </div>
</div>