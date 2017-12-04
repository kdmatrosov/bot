<template>
    <div class="test">
        <h1>Users of Bot#2
        </h1>
        <div class="control-users">
            <div class="control-users__control" @click="previosPage" v-if="!isFirstPage()">Previous Users</div>
            <div class="control-users__control" @click="nextPage">Next Users</div>
        </div>
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
                users: []
            };
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            goToUser(id) {

                this.$router.push({path: `user/${id}`});
            },
            getUsers() {
                const mock = new MockAdapter(this.$http.api);

                mock.onGet('/users').reply(200, {
                    result: USERS.data()
                });
                this.$http.api.get('/users', {})
                    .then((response) => {
                        this.users = response && response.result || [];
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            errorImage(user) {
                this.$set(user, 'errorImage', CommonFuncs.getBeginningsOfName(user.name));
            },
            previosPage() {
                USERS.previosPage();
                this.getUsers();
            },
            nextPage() {
                USERS.nextPage();
                this.getUsers();
            },
            isFirstPage() {
                return USERS.isFirstPage();
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
            margin-bottom: 16px;
        }
    }

    .list-of-users {
        padding: 4px 24px;
        display: flex;
        flex-wrap: wrap;
        &__user {
            border: 1px solid #d1d1d1;
            padding: 16px;
            margin: 8px;
            width: 150px;
            &:hover {
                cursor: pointer;
                background-color: #eeeeee;
            }
        }
    }

    .control-users {
        display: flex;
        padding: 4px 24px;
        &__control {
            background: #fafafa;
            padding: 4px 8px;
            border: 1px solid #d1d1d1;
            margin: 0 8px;
            &:hover {
                cursor: pointer;
                background-color: #ffffff;
            }
        }
    }

</style>
