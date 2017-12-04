<template>
    <div class="test">
    </div>
</template>

<script>
    import MockAdapter from 'axios-mock-adapter';

    export default {
        name: 'test',
        data: function () {
            return {
                mock: null,
                user: {}
            };
        },
        computed: {},
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
    .test {
        width: 100%;
        height: 100%;
        h1 {
            padding: 0 32px;
        }
    }


</style>
