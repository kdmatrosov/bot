import faker from 'faker';

console.log(faker);

function Users() {
    let USERS = [];

    this.data = (user) => {
        if (!!user) {
            if (!!user.id) {
                const index = USERS.findIndex(u => u.id === user.id);
                USERS[index] = {...user};
            }
            else {
                const MAX_INDEX = Math.max(...USERS.map(u => u.id).concat([0]));
                USERS.push({
                    ...user,
                    id: MAX_INDEX + 1
                });
            }
        } else {
            return ((__USERS) => {
                let res = [];
                if (__USERS.length === 0) {
                    for (let i = 0, len = 10; i < len; i++){
                        this.data({
                            name: faker.name.firstName() + ' ' + faker.name.lastName(),
                            avatarUrl: faker.internet.avatar(),
                            date: (function (date) {
                                return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`.replace(/\b(\d)\b/g, '0$1');
                            })(faker.date.past())
                        });
                    }
                }
                __USERS.forEach(u => {
                    res.push(u);
                });
                return res;
            })(USERS)
        }
    }
}

export default new Users;