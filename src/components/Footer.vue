<template>
    <div class="footer-holder">
        <p class="footer-text">API Version: {{ apiVersion }}</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const apiVersion = ref(null);

    const fetchVersion = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/version");
            const finalRes = await response.json();
            apiVersion.value = finalRes.version;
        } catch (error) {
            console.error('Error fetching api version:', error);
        }
    };

    fetchVersion(); 
</script>