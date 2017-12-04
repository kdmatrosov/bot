import faker from 'faker';

console.log(faker);

function Users() {
    let USERS = [], page = 1;
    this.isFirstPage = () => {
        return page === 1;
    };
    this.nextPage = () => {
        page++;
    };
    this.previosPage = () => {
        if (page > 1) {
            page--;
        }
    };

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
                if (__USERS.length < page * 10 + 10) {
                    for (let i = page - 1, len = page + 10; i < len; i++) {
                        this.data({
                            name: faker.name.firstName() + ' ' + faker.name.lastName(),
                            avatarUrl: faker.internet.avatar(),
                            email: faker.internet.email(),
                            country: faker.address.country(),
                            date: (function (date) {
                                return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`.replace(/\b(\d)\b/g, '0$1');
                            })(faker.date.past())
                        });
                    }
                }
                __USERS.slice((page - 1) * 10, (page - 1) * 10 + 10).forEach(u => {
                    res.push(u);
                });
                return res;
            })(USERS)
        }
    }
}

export default new Users;