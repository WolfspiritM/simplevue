<template>
    <div>
        Hello World!
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component({})
    export default class HelloWorld extends Vue {
        public updated() {
            const test: string = 1;
        }
    }
</script>
