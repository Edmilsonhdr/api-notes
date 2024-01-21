const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class SessionsController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */

    async create(req, res) {
        const { email, password } = req.body;

        const user = await knex("users").where({ email }).first();

        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        return res.json(user);
    }


}

module.exports = SessionsController;