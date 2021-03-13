<script>
	import { Router, Route, Link } from "svelte-routing";
import CreateUmfrage from "./CreateUmfrage.svelte";
import Detail from "./Detail.svelte";
import EditPosts from "./EditPosts.svelte";
	import Home from "./Home.svelte";
import Login from "./Login.svelte";
import Umfragen from "./Umfragen.svelte";
	import Upload from "./Upload.svelte";
import UploadMessage from "./UploadMessage.svelte";
	export let url = "";
  </script>



<link rel="stylesheet" href="./Skeleton-2.0.4/css/normalize.css">
<link rel="stylesheet" href="./Skeleton-2.0.4/css/skeleton.css">
  <Router url="{url}">
	<nav>
		<title>Abizeitung Pog</title>
		<div class="container" width="200px">
		<div class="row">
	   <div class="three columns"><Link to="/">Home</Link></div>
	   <div class="three columns"><Link to="/upload">Upload</Link></div>
	   <div class="three columns"><Link to="/login">Login</Link></div>
	   <div class="three columns"><Link to="/umfragen">Umfragen</Link></div>
	</div>
	</div>
	 </nav>
	 
	 <div>
	   <Route path="/"><Home /></Route>
	   <Route path="/login" component="{Login}" /> 
	   <Route path="/upload" component="{Upload}" /> 
	   <Route path="/umfragen" component="{Umfragen}" />
	   <Route path="/edit-posts" component="{EditPosts}" /> 
	   <Route path="/umfrage-edit" component="{CreateUmfrage}" />
	   <Route path="/student/:id" let:params><Detail index="{params.id}"></Detail></Route> 
	 </div>
   </Router>

   <style>
	   nav{
		   text-align: center;
		   font-family: "Ubuntu";
	   }

   </style>
