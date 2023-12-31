const knex = require("../database/knex");

class NotesController {
    /**
     * index - GET Listar varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */
    async create(req, res) {
        try {
            const { title, description, tags, links } = req.body;
            const { user_id } = req.params;

            // Inserir a nota e obter o ID inserido
            const [note_id] = await knex("notes").insert({
                title,
                description,
                user_id
            });

            // Inserir os links associados à nota
            const linksInsert = links.map(url => {
                return {
                    note_id,
                    url
                };
            });

            await knex("links").insert(linksInsert);

            // Inserir as tags associadas à nota
            const tagsInsert = tags.map(name => {
                return {
                    note_id,
                    name,
                    user_id
                };
            });

            await knex("tags").insert(tagsInsert);

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

module.exports = NotesController;