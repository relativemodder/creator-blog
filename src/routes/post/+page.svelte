<Navbar title="Publish Post" />
<svelte:head>
	<title>Publish Post</title>
</svelte:head>

<AppContent>
	<div class="blog-content publish">
		<center><h1>Publish post</h1></center>
		<form on:submit={handleSubmitForm}>
			<Paper>
				<Textfield
					type="text"
					bind:value={postTitle}
					label="Title"
					style="min-width: 250px;"
					input$autocomplete="title"></Textfield>
				<Textfield
					type="text"
					bind:value={postSubtitle}
					label="Subtitle"
					style="min-width: 250px;"
					input$autocomplete="subtitle"></Textfield>
				<Textfield
					type="url"
					bind:value={postPreview}
					label="URL to preview"
					style="min-width: 250px;"
					input$autocomplete="url"></Textfield>
				<Textfield
					style="margin-top: 20px; margin-right: 5px; height: auto;"
					helperLine$style="width: 50%;"
					textarea
					input$rows={12}
					input$style="font-family: 'Courier New';"
					bind:value={postContent}
					label="Post Content (Markdown)">
					</Textfield>
				<h2>Preview with Markdown</h2>
				<Paper class="blog-post-preview" style="overflow-wrap: break-word;">
					<SvelteMarkdown source={ postContent } />
				</Paper>
				<Button variant="raised">
					<Label>Publish</Label>
				</Button>
			</Paper>
		</form>
	</div>
</AppContent>


<script>
import Textfield from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';
import { fade, fly } from 'svelte/transition';
import Button, { Label } from '@smui/button';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
import Navbar from "$lib/components/navbar.svelte";
import ResizableTextArea from "$lib/components/TextAreaAutoresize.svelte";

import { AppContent } from '@smui/drawer';
import Fab, { Icon } from '@smui/fab';
import SvelteMarkdown from 'svelte-markdown'

import { browser } from '$app/environment';


let postTitle = "";
let postSubtitle = "";
let postContent = "";
let postPreview = "";

async function handleSubmitForm(e) {
	e.preventDefault();
	console.log("Publishing...");
	
	const reqData = {
		preview: postPreview, 
		title: postTitle,
		subtitle: postSubtitle,
		content: postContent
	};
	
	const req = await fetch("/api/v1/posts", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqData)
	});
	
	const res = await req.json();
	const postID = res.post_id;
	
	window.location = "/post/" + postID;
}

</script>