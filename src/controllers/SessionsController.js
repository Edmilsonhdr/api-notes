
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

        return res.json({ email, password })
    }


}

module.exports = SessionsController;