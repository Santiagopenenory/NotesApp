<script>    
import {Link} from 'svelte-routing';
import Typewriter from 'svelte-typewriter';
</script>
<nav>
    <Typewriter  interval=200>
        <h1 class="nav-title">Notes App</h1>
    </Typewriter>
        <div>
            <Link  to="/">All Notes</Link>
            <Link  to="archived-notes">Archived Notes</Link>
        </div>

</nav>

<style>
    nav{
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
    }

   

</style>