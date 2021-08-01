const bcrypt = require('bcrypt');

async function pass() {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash("ndthinh18", salt);
    console.log(password)
}

pass()