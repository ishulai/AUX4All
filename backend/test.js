let users = [{
        votes: 15
    },
    {
        votes: 10
    }
]

var table = [];
users.forEach((u, i) => {
    for(let j = 0; j < u.votes; j++) {
        table.push(i);
    }
});