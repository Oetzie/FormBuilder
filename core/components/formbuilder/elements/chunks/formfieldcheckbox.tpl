<div class="form-group {!empty($required) ? 'required' : ''} {!empty($error) ? 'form-group--error' : ''}">
    {if !empty($label)}
        <label>{$label} {!empty($required) ? '*' : ''}</label>
    {/if}

    <div class="form-control-wrapper">
        {$values} {$error}
        {!empty($description) ? '<p class="help-block">' ~ $description ~ '</p>' : ''}
    </div>
</div>