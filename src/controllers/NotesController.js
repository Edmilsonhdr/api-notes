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

    async show(req, res) {
        const { id } = req.params;
        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
        const links = await knex("links").where({ note_id: id }).first("created_at");
        return res.json({
            ...note, tags, links
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex("notes").where({ id }).delete();

        return res.json();
    }

    async index(req, res) {
        try {
            const { title, user_id, tags } = req.query;

            let notes;

            if (tags) {
                const filterTags = tags.split(',').map(tag => tag.trim());

                notes = await knex("tags")
                    .select([
                        "notes.id",
                        "notes.title",
                        "notes.user_id"
                    ])
                    .where("notes.user_id", user_id)
                    .whereLike("notes.title", `%${title}%`)
                    .whereIn("name", filterTags)
                    .innerJoin("notes", "notes.id", "tags.note_id")
                    .orderBy("title")

            } else {

                // Utilize o método 'select' para explicitamente selecionar as colunas desejadas
                notes = await knex("notes")
                    .where({ user_id })
                    .whereLike("title", `%${title}%`)
                    .orderBy("title");


            }
            return res.json(notes);
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
            return res.status(500).json({ error: "Erro interno ao processar a solicitação." });
        }
    }


}

module.exports = NotesController;