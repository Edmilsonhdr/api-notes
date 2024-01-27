const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */
    async update(req, res) {
        const user_id = req.user.id;
        const avatarFilename = req.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
            .where({ id: user_id }).first();

        if (!user) {
            throw new AppError("Somente usuarios autenticados podem mudar o avatar", 401);
        };

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await knex("users").update(user).where({ id: user_id });

        return res.json(user);
    }
}

module.exports = UserAvatarController;