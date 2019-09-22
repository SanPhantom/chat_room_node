module.exports = class User {
    constructor() {
        this.id = null;
        this.nickname = null;
        this.phone = null;
        this.email = null;
        this.avatar = null;
        this.cid = null;
    }

    init(user) {
        this.id = user.id || '';
        this.nickname = user.nickname || '';
        this.phone = user.phone || '';
        this.email = user.email || '';
        this.avatar = user.avatar || '';
        this.cid = user.cid || '';
    }

    toString() {
        return {
            id: this.id,
            nickname: this.nickname,
            phone: this.phone,
            email: this.email,
            avatar: this.avatar,
            cid: this.cid
        }
    }

} 
