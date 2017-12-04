<template>
    <div class="test">
        <h1>Users of Bot#2</h1>
        <div class="list-of-users">
            <div v-for="user in users" class="list-of-users__user" @click="goToUser(user.id)">
                <div class="user-avatar">
                    <img :src="user.avatarUrl" @error="errorImage(user)" v-if="!user.errorImage">
                    <div v-else class="user-avatar__empty">
                        {{user.errorImage}}
                    </div>
                </div>
                <div>{{user.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import MockAdapter from 'axios-mock-adapter';

    import USERS from '@/data/users';
    import CommonFuncs from '@/common/CommonFuncs';

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
                users: USERS.data(),
                token: 'it can be usefull'
            });
            this.$http.api.get('/users', {})
                .then((response) => {
                    this.users = response && response.users || [];
                    CommonFuncs.getBeginningsOfName(this.users[0].name)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods: {
            goToUser(id) {

                this.$router.push({path: `user/${id}`});
            },
            errorImage(user) {
                this.$set(user, 'errorImage', CommonFuncs.getBeginningsOfName(user.name));
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
