class UsersController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */

    create(req, res) {
        const { name, email, password } = req.body;
        res.json({ name, email, password });
    }
}

module.exports = UsersController;