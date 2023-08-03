<svelte:head>
	<title>{ data.title }</title>
</svelte:head>

<Navbar title={ data.title } />
<AppContent>
	<div class="blog-content">
		<Paper class="blog-post">
			<Fab color="primary" on:click={() => {
				history.back();
			}} style="margin-right: 20px; margin-bottom: 20px;">
				<h2 class="bi bi-arrow-left"></h2>
			</Fab>
			<Title class="form-title">
				<b>{ data.title }</b>
			</Title>
			
			<Subtitle>
				{ data.subtitle }
			</Subtitle>
			
			<SvelteMarkdown source={ data.content } />
		</Paper>
	</div>
</AppContent>

<script>
import Button, { Label } from '@smui/button';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
import Navbar from "$lib/components/navbar.svelte";
import Textfield from '@smui/textfield';
import Fab, { Icon } from '@smui/fab';

import SvelteMarkdown from 'svelte-markdown'
import { AppContent } from '@smui/drawer';

export let data;

</script>

<style>
.blog-content {
	width: 98%;
	display: flex;
	justify-content: center;
}
</style>