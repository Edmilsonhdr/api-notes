const knex = require("../database/knex");

class TagsController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */

    async index(req, res) {
        const user_id = req.user.id;

        const tags = await knex("tags")
            .where({ user_id })

        return res.json(tags);
    }
}

module.exports = TagsController;