<template>
    <div class="test">
        <button @click="goToIndex" class="go-to-index">На главную</button>
        <div v-if="user.id" class="user-info">
            <div class="user-info__header">Информация о пользователе</div>
            <p><img :src="user.avatarUrl" alt=""></p>
            <p><input type="text" name="" id="" v-model="user.name" @keypress="acceptName($event)"></p>
            <p>{{user.date}}</p>
        </div>
    </div>
</template>

<script>
    import MockAdapter from 'axios-mock-adapter';

    export default {
        name: 'test',
        data: function () {
            return {
                mock: null,
                user: {},
                error: ''
            };
        },
        computed: {},
        mounted() {
            const id = this.$route.params.id;
            this.mock = new MockAdapter(this.$http.api);
            this.mock.onGet('/user/' + id).reply(200, {
                user:
                    {
                        id: 1,
                        name: 'John Smith',
                        avatarUrl: 'http://99px.ru/sstorage/1/2015/05/image_10705151253382918827.gif',
                        date: '01.01.1970'
                    }
            });
            this.$http.api.get('/user/' + id, {})
                .then((response) => {
                    this.user = response && response.user || {};
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods: {
            goToIndex() {
                router.push({name: 'index'});
            }
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

    .go-back {
        padding: 0 64px;
    }

    .user-info {
        padding: 64px;
        &__header {
            font-size: 20px;
        }
        p {
            margin: 8px 0;
        }
    }


</style>
