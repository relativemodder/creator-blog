<Navbar title="Sign in" />
<AppContent>
	<div class="blog-content">
		<Paper class="signup-form">
			<Title class="form-title">Sign in</Title>
			<Subtitle>Need an account? <a href="/signup">Sign up</a></Subtitle>
			
			<form on:submit={handleFormSubmit}>
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
					<Label>Log in</Label>
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
import Cookies from 'js-cookie';
import { AppContent } from '@smui/drawer';

let email = "";
let password = "";
let status = "";

async function handleFormSubmit(e) {
	e.preventDefault();
	const request = await fetch("/api/v1/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});
	const response_text = await request.text();
	const response_json = JSON.parse(response_text);
	
	if (response_json.error === "invalid_credentials") {
		status = "Invalid e-mail or password.";
		return;
	}
	
	if (response_json.token !== undefined) {
		Cookies.set("token", response_json.token, { expires: 30, path: '/' });
		window.location = "/";
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