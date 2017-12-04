function Users() {
    let USERS = [
        {
            id: 1,
            name: 'John Smith',
            avatarUrl: 'http://99px.ru/sstorage/1/2015/05/image_10705151253382918827.gif',
            date: '01.01.1970',
            hobby: 'Pony'
        },
        {
            id: 2,
            name: 'Alex Black',
            avatarUrl: 'http://99px.ru/sstorage/1/2016/06/image_10806161457435213399.jpg',
            date: '01.02.1970'
        },
        {
            id: 3,
            name: 'James Quick',
            avatarUrl: 'http://99px.ru/sstorage/1/2016/10/image_1291016132347847071.gif3',
            date: '02.01.1970',
            hobby: 'Games'
        },
        {
            id: 4,
            name: 'Clark Kent',
            avatarUrl: 'http://99px.ru/sstorage/1/2011/08/image_11308110339454380801.jpg',
            date: '02.02.1970',
            hobby: 'Food, tasty food'
        }
    ];

    this.data = (user) => {
        if (!!user) {
            if (!!user.id) {
                const index = USERS.findIndex(u => u.id === user.id);
                USERS[index] = {...user};
            }
            else {
                const MAX_INDEX = Math.max(...USERS.map(u => u.id));
                USERS.push({
                    ...user,
                    id: MAX_INDEX
                });
            }
        } else {
            return ((__USERS) => {
                let res = [];
                __USERS.forEach(u => {
                    res.push(u);
                });
                return res;
            })(USERS)
        }
    }
}

export default new Users;