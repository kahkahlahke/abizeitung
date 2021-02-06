<script>
	import { Router, Route, Link } from "svelte-routing";
import Detail from "./Detail.svelte";
	import Home from "./Home.svelte";
import Login from "./Login.svelte";
	import Upload from "./Upload.svelte";
	export let url = "";
  </script>



<link rel="stylesheet" href="./Skeleton-2.0.4/css/normalize.css">
<link rel="stylesheet" href="./Skeleton-2.0.4/css/skeleton.css">
  <Router url="{url}">
	<nav>
		<div class="container" width="200px">
		<div class="row">
	   <div class="one-third column"><Link to="/">Home</Link></div>
	   <div class="one-third column"><Link to="/upload">Upload</Link></div>
	   <div class="one-third column"><Link to="/login">Login</Link></div>
	</div>
	</div>
	 </nav>
	 
	 <div>
	   <Route path="/"><Home /></Route>
	   <Route path="/login" component="{Login}" /> 
	   <Route path="/upload" component="{Upload}" /> 
	   <Route path="/student/:id" let:params><Detail id="{params.id}"></Detail></Route> 
	 </div>
   </Router>

   <style>
	   nav{
		   text-align: center;
		   font-family: "Ubuntu";
	   }

   </style>
