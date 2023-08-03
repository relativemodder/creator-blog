<Drawer style="position: fixed;" variant="modal" fixed={false} bind:open>
    <Header>
      <Title>
		<div style="display: flex; align-items: center;">
			Creator's swamp
			<IconButton on:click={() => {
				open = false;
			}}
			style="margin-left: 20px;"
			>
				<h1 class="bi bi-x"></h1>
			</IconButton>
		</div>
	</Title>
      <Subtitle>Select the page</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
			href="/"
			on:click={() => setActive('Home')}
		>
            <Graphic aria-hidden="true">
				<h1 class="bi bi-house-door-fill"></h1>
		    </Graphic>
            <Text>Home</Text>
        </Item>
        <Item
			href="/profile"
			on:click={() => setActive('Profile')}
		>
            <Graphic aria-hidden="true">
				<h1 class="bi bi-person-fill"></h1>
		    </Graphic>
            <Text>My profile</Text>
        </Item>
		{#if Cookies.get('token') !== undefined}
			<Item
				href="#"
				on:click={handleLogoutButton}
			>
				<Graphic aria-hidden="true">
					<h1 class="bi bi-door-closed-fill"></h1>
				</Graphic>
				<Text>Logout</Text>
			</Item>
		{/if}
		{#if canSeeAdminItems}
			<Item
				href="/post"
			>
				<Graphic aria-hidden="true">
					<h1 class="bi bi-pencil-fill"></h1>
				</Graphic>
				<Text>Publish Post</Text>
			</Item>
		{/if}
      </List>
    </Content>
</Drawer>

<script lang="ts">
import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
    Scrim,
} from '@smui/drawer';
import Button, { Label } from '@smui/button';
import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
import IconButton from '@smui/icon-button';
import Cookies from 'js-cookie';
import { browser } from '$app/environment';
 
export let open = false;
let active = 'Inbox';

let canSeeAdminItems = false;

async function initUserStatus() {
	const req = await fetch("/api/v1/get_me");
	const me = await req.json();
	
	canSeeAdminItems = me.is_admin;
}

if (browser) initUserStatus();

function setActive(value: string) {
  active = value;
  open = false;
}

async function handleLogoutButton(e) {
	e.preventDefault();
	Cookies.remove('token');
	Cookies.remove('token', {path: '/api/v1'});
	window.location = "/";
}

</script>