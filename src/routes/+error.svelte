<Navbar title="Error" />
<AppContent>
	<div class="blog-content">
		<Paper>
			<Title>
				<i class="bi bi-x-octagon-fill fs-1"></i>
				Error {$page.status}
			</Title>
			<Subtitle>{$page.error.message}</Subtitle>
		</Paper>
	</div>
</AppContent>

<script>
import { page } from '$app/stores';
import Navbar from "$lib/components/navbar.svelte";
import { AppContent } from '@smui/drawer';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
</script>

<style>
.blog-content {
	text-align: center;
}
</style>