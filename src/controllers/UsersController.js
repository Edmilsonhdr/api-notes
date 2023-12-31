const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
class UsersController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */

    async create(req, res) {
        const { name, email, password } = req.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists) {
            throw new AppError('Este email ja esta em uso');
        }

        return res.status(201).json();
    }
}

module.exports = UsersController;