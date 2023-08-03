<Navbar title="Home" />
<svelte:head>
	<title>Main</title>
</svelte:head>

<AppContent>
	<div class="blog-content">
		<center><h1>Latest posts</h1></center>
		
		{#each posts as post}
		<div class="post" style="margin-bottom: 20px;" in:fly={{ y: 100, duration: 500 }} out:fade>
			<Paper class="post">
				<div class="post" style="display: flex; flex-wrap: wrap;">
					<img src={ post.preview } width={300} />
					<div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: space-around;">
						<div style="height: auto;">
							<Title>{ post.title }</Title>
							<Subtitle>{ post.subtitle }</Subtitle>
						</div>
						<Button href={"/post/" + post.id} variant="raised" style="width: 200px;">
							<Label>
								<i class="bi bi-arrow-right" style="margin-right: 10px;"></i>
								Go to the post
							</Label>
						</Button>
					</div>
				</div>
			</Paper>
		</div>
		{/each}
		<center>
			<Button on:click={handleLoadMore} disabled={!loaded}>
				{#if !loaded}
					<CircularProgress style="height: 32px; width: 32px; margin-right: 10px;" indeterminate />
				{/if}
				<Label>Load more</Label>
			</Button>
		</center>
	</div>
</AppContent>

{#if (data !== undefined) && (data.is_admin > 0)}
	<Fab href="/post" color="primary" class="fab-rb">
		<i class="bi bi-pencil-fill"></i>
	</Fab>
{/if}

<script>
import { fade, fly } from 'svelte/transition';
import Button, { Label } from '@smui/button';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
import Navbar from "$lib/components/navbar.svelte";
import CircularProgress from '@smui/circular-progress';

import { AppContent } from '@smui/drawer';
import Fab, { Icon } from '@smui/fab';

import { browser } from '$app/environment';

export let data;

let loaded = false;
let posts = [];

async function constructPosts(more_than = undefined) {
	loaded = false;
	let requestUrl = "/api/v1/posts";
	
	if (more_than !== undefined) {
		requestUrl += `?more_than=${more_than}`;
	}
	
	const req = await fetch(requestUrl);
	posts = await req.json();
	loaded = true;
}

async function handleLoadMore() {
	await constructPosts(posts.length);
}

if (browser) constructPosts();

</script>