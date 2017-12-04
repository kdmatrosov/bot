<template>
    <div class="not-found">
        <div class="not-found__text">{{text}}
            <div>
                <button @click="goToIndex" class="go-to-index">На главную</button>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '@/router';

    export default {
        name: 'not-found',
        data() {
            return {
                text: 'Страница не найдена'
            }
        },
        methods: {
            goToIndex() {
                router.push({name: 'index'});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .not-found {
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .not-found__text {
        font-size: 20px;
    }

</style>
