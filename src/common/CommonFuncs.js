export default {
    getBeginningsOfName(name) {
        if (name !== null && name !== undefined){
            const res = name.match(/(?:^|\s?)+([A-Z])/);
            let __name =''; res.forEach(letter=>{
                __name = __name + letter;
            });
            return __name;
        }
        return '';
    }
};