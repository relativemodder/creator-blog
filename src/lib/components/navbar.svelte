<div class="gd-nav-content">
<NavDrawer bind:open={open} />
<TopAppBar variant="standard" class="navbar-width-fix" style="color: white;" color="primary">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={handleToggleDrawer}>
		<i class="bi bi-list"></i>
	  </IconButton>
      <Title>{ title }</Title>
    </Section>
    <Section align="end" toolbar>
		{#if false}
		<a href="/" on:click={handleLogoutButton}>
		    <IconButton class="material-icons" aria-label="Logout">
				<i class="bi bi-door-closed-fill"></i>
			</IconButton>
		</a>
		{/if}
    </Section>
  </Row>
</TopAppBar>
</div>

<script>
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';
import IconButton from '@smui/icon-button';
import NavDrawer from './navdrawer.svelte';
import Cookies from 'js-cookie';

let open = false;

function handleToggleDrawer() {
	open = !open;
}

async function handleLogoutButton(e) {
	e.preventDefault();
	Cookies.remove('token');
	window.location = "/";
}

export let title = "";

</script>

<style>
.navbar-width-fix {
	color: white;
}
.gd-nav-content {
	width: 100%;
	height: 30px;
}
</style>