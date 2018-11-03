class vote {
    constructor(userId, value) {
        this.userId = userId;
        this.value = value; // -1 or 1
    }

    getValue() {
        return this.value;
    }

    getUserId() {
        return this.userId;
    }
}