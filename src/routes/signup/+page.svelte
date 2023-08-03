<Navbar title="Sign up" />
<AppContent>
	<div class="blog-content">
		<Paper class="signup-form">
			<Title class="form-title">Sign up</Title>
			<Subtitle>Already have an account? <a href="/signin">Sign in</a></Subtitle>
			
			<form on:submit={handleFormSubmit}>
				<Textfield
					type="text"
					bind:value = {username}
					label="Username"
					style="min-width: 250px;"
					input$autocomplete="text"
				    >
				</Textfield>
				<Textfield
					type="email"
					bind:value = {email}
					label="E-mail"
					style="min-width: 250px;"
					input$autocomplete="email"
				    >
				</Textfield>
				<Textfield
					type="password"
					bind:value = {password}
					label="Password"
					style="min-width: 250px;"
					input$autocomplete="password"
				    >
				</Textfield>
				<span style="color: red;">{ status }</span>
				<Button variant="raised">
					<Label>Register</Label>
				</Button>
			</form>
		</Paper>
	</div>
</AppContent>

<script>
import Button, { Label } from '@smui/button';
import Paper, { Title, Subtitle, Content } from '@smui/paper';
import Navbar from "$lib/components/navbar.svelte";
import Textfield from '@smui/textfield';

import { AppContent } from '@smui/drawer';

let username = "";
let email = "";
let password = "";
let status = "";

async function handleFormSubmit(e) {
	e.preventDefault();
	const request = await fetch("/api/v1/register", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, email, password })
	});
	const response_text = await request.text();
	const response_json = JSON.parse(response_text);
	
	if (response_json.error === "user_already_exists") {
		status = "User already exists.";
		return;
	}
	
	if (response_json.token !== undefined) {
		return;
	}
	
	
}
</script>

<style>
.blog-content {
	width: 98%;
	display: flex;
	justify-content: center;
}
</style>