<template>
  <div id="app" v-cloak > 
		<bottom v-if="$route.meta.keepAlive"></bottom>
    <router-view/>
  </div>
</template>

<script>
	
import bottom from './components/bottom.vue';
export default {
  name: 'App',
	components: { 
        bottom: bottom
      }

}
</script>

<style>
body,html{
	margin: 0; 
} 
 
a{
	text-decoration: none;
	color:#000; 
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
-webkit-user-select: none;
-moz-user-focus: none;
-moz-user-select: none;
}
 
[v-cloak] {
  display: none;
}
</style>
