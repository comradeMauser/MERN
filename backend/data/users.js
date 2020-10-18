import bcryptjs from 'bcryptjs';

const users = [
    {
        name: 'Admin user',
        email: 'admin@com',
        password: bcryptjs.hashSync('123456789', 10),
        isAdmin: true
    }, {
        name: 'John Doe',
        email: 'johndoe@com',
        password: bcryptjs.hashSync('123456789', 10),
    }, {
        name: 'Jane Doe',
        email: 'janedoe@com',
        password: bcryptjs.hashSync('123456789', 10),
    },
]

export default users