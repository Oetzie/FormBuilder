<div class="form-group {!empty($required) ? 'required' : ''} {!empty($error) ? 'form-group--error' : ''}">
    {if !empty($label)}
        <label for="{$key}">{$label} {!empty($required) ? '*' : ''}</label>
    {/if}

    <div class="form-control-wrapper">
        <input type="file" name="{$key}" id="{$key}" class="form-control form-control--upload" {!empty($placeholder) ? 'placeholder="' ~ $placeholder ~ '"' : ''} value="{$value}" /> {$error}
        {!empty($description) ? '<p class="help-block">' ~ $description ~ '</p>' : ''}
    </div>
</div>