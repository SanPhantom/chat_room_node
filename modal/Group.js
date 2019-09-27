module.exports = class Group {
    constructor() {
        this.id = null;
        this.groupname = null;
        this.gid = null;
        this.uid = null;
        this.desc = null;
    }

    init(group) {
        this.id = group.id || this.id;
        this.groupname = group.groupname || this.groupname;
        this.gid = group.gid || this.gid;
        this.uid = group.uid || this.uid;
        this.desc = group.desc || this.desc;
    }
}