import bcrypt from "bcryptjs";

const users = [
    {
        name: "Hokage",
        email: "hokage-office@konoha.org",
        password: bcrypt.hashSync("hokageoftheleaf", 10),
        isAdmin: true,
    },
    {
        name: "Kakashi Hatake",
        email: "kakashi@konoha.org",
        password: bcrypt.hashSync("kakashioftheleaf", 10),
        isAdmin: false,
    },
    {
        name: "Sakura Ahuno",
        email: "sakura@konoha.org",
        password: bcrypt.hashSync("sakuraoftheleaf", 10),
        isAdmin: false,
    },
];

export default users;