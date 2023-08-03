<script>
import Textfield from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';

	export let value = '';
	export let minRows = 1;
	export let maxRows;
	
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container">
</div>

<style>
	.container {
		position: relative;
	}
	
	pre, textarea {
		font-family: Courier New;
		padding: 0.5em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
		overflow: hidden;
		
	}
	
	pre {
		width: 100%;
		overflow-wrap: break-word;
	}
	
	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		min-height: 600px;
		top: 0;
		resize: none;
	}
</style>