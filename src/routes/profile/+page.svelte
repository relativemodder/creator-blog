<svelte:head>
	<title>Profile</title>
</svelte:head>

<Navbar title="Profile" />
<AppContent>
	<div class="blog-content">
		<Paper class="signup-form">
			<Title class="form-title">{ data.username.toUpperCase() }</Title>
			<Subtitle>
				<b>Status:</b> 
				{#if (data.is_admin == 0)}
					<i class="bi bi-person"></i>
					User
				{:else}
					<i class="bi bi-wrench"></i>
					Admin
				{/if}
			</Subtitle>
		</Paper>
	</div>
</AppContent>

<script>
import Button, { Label } from '@smui/button';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
import Navbar from "$lib/components/navbar.svelte";
import Textfield from '@smui/textfield';

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