<template>
    <div class="test">
        <div style="padding: 16px 64px">
            <button @click="goToIndex" class="go-to-index">На главную</button>
        </div>

        <div v-if="user.id" class="user-info">
            <div class="user-info__header" @click="activateAdmin()">Информация о пользователе</div>
            <div>
                <img :src="user.avatarUrl" @error="errorImage(user)" v-if="!user.errorImage">
                <div v-else class="user-avatar__empty">
                    {{user.errorImage}}
                </div>
            </div>
            <p><input type="text" name="" id="" class="user-info__name" v-model="user.name"
                      @focus="temp_name = user.name"
                      @blur="user.name = temp_name; temp_name = ''"
                      @keypress="acceptName($event)" :readonly="!temp_name || !isAdmin"></p>
            <p>BirthDay: {{user.date}}</p>
            <p>Country: {{user.country}}</p>
            <p>Email: {{user.email}}</p>
            <p v-if="user.hobby">My hobby: {{user.hobby}}</p>
        </div>
        <div v-else class="user-info-error">
            Ошибка доступа к пользователю
        </div>
    </div>
</template>

<script>
    import MockAdapter from 'axios-mock-adapter';

    import USERS from '@/data/users';
    import IS_ADMIN from '@/CONST/is_admin';
    import CommonFuncs from '@/common/CommonFuncs';

    export default {
        name: 'test',
        data: function () {
            return {
                mock: null,
                user: {},
                error: '',
                temp_name: '',
                isAdmin: false,
                count: 0
            };
        },
        computed: {},
        mounted() {
            const id = this.$route.params.id;
            this.isAdmin = this.$route.query.admin === IS_ADMIN;
            this.mock = new MockAdapter(this.$http.api);
            if (!!this.mock) {
                this.mock.onGet('/user/' + id).reply(200, {
                    result: USERS.data().find(user => user.id === +id) || {}
                });
                this.$http.api.get('/user/' + id, {})
                    .then((response) => {
                        this.user = response && response.result || {};
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        methods: {
            activateAdmin(){
                this.count++;
                if (this.count === 5){
                    this.isAdmin = true;
                }
            },
            goToIndex() {
                this.$router.push({name: 'index'});
            },
            acceptName(e) {
                if (e.which === 13 && this.mock && !!this.temp_name) {
                    this.mock.onPost('/user/' + this.user.id, {
                        name: this.user.name,
                        avatarUrl: this.user.avatarUrl,
                    }).reply(200, {
                        result: 1
                    });
                    this.$http.api.post('/user/' + this.user.id, {
                        name: this.user.name,
                        avatarUrl: this.user.avatarUrl,
                    }).then((response) => {
                        USERS.data(this.user);
                        this.temp_name = '';
                    }).catch((error) => {
                        console.log(error);
                    });
                }
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

    .go-back {
        padding: 0 64px;
    }

    .user-info {
        padding: 64px;
        &__header {
            font-size: 20px;
        }
        &__name {
            height: 20px;
            &[readonly] {
                border: 0;
                padding: 0;
            }
        }
        p {
            margin: 8px 0;
        }
    }

    .user-info-error {
        color: #ff0000;
        font-size: 24px;
        padding: 0 64px;
    }


</style>
