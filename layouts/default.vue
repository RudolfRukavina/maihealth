<template>
  <div class="flex flex-col min-h-screen bg-black">
    <!-- Header Component -->
    <Header :initialPath="currentPath" @update:activeRoute="updateActiveRoute" />

    <!-- Main content with padding to account for fixed header -->
    <main class="flex-grow pt-20 md:pt-28">
      <slot />
    </main>

    <Footer></Footer>
    <!-- Footer could be added here as a separate component -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '~/components/Header.vue';

const route = useRoute();
const currentPath = ref('/');
const activeRoute = ref('/');

// Extract the current path without locale prefix
const updateActiveRoute = (routePath) => {
  activeRoute.value = routePath;
};


onMounted(() => {
  // Set initial path based on current route
  const path = route.path;
  currentPath.value = path.replace(/^\/[a-z]{2}/, '') || '/';
});
</script>

<style >
html, body {
  background: black;
}
/* Add any global styles here */
/* For example, ensuring content has proper spacing from fixed header */
</style>