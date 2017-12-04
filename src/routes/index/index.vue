<template>
    <div class="test">
        <h1>Users of Bot#2</h1>
        <div class="list-of-users">
            <div v-for="user in users" class="list-of-users__user" @click="goToUser(user.id)">
                <img :src="user.avatarUrl">
                <div>{{user.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import MockAdapter from 'axios-mock-adapter';

    import USERS from '@/CONST/users';
    export default {
        name: 'test',
        data: function () {
            return {
                mock: null,
                users: []
            };
        },
        mounted() {
            this.mock = new MockAdapter(this.$http.api);
            this.mock.onGet('/users').reply(200, {
                users: USERS,
                token: 'it can be usefull'
            });
            this.$http.api.get('/users', {})
                .then((response) => {
                    this.users = response && response.users || [];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods:{
            goToUser(id){

                this.$router.push({path: `user/${id}`});
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

    .list-of-users {
        padding: 16px 24px;
        width: 300px;
        &__user {
            &:nth-child(odd) {
                background-color: #fafafa;
            }
            padding: 4px 8px;
            &:hover {
                cursor: pointer;
                background-color: #eeeeee;
            }
        }
    }

</style>
