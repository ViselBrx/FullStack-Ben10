const prisma = require("../data/prisma");

const listar = async (req, res) => {

    const lista = await prisma.aliens.findMany({
        include: {
            series: true
        }
    });

    const dados = lista.map((alien) => ({
        id: alien.id,
        nome: alien.nome,
        usuarioId: alien.usuarioId,
        data_cadastro: alien.data_cadastro,
        series: alien.series.map((item) => item.serie) // mapeia a lista de séries associadas ao alien e retorna apenas o nome da série
    }));

    res.status(200).json(dados);
};

const cadastrar = async (req, res) => {

    const data = req.body;

    const item = await prisma.aliens.create({
        data: {
            nome: data.nome,
            usuarioId: Number(data.usuarioId),

            series: {
                create: data.series.map((serie) => ({ // cria um novo registro na tabela aliensSeries para cada série associada ao alien
                    serie: serie
                }))
            }
        }
    });

    res.status(201).json(item);
};

const atualizar = async (req, res) => {

    const { id } = req.params;

    const data = req.body;

    await prisma.aliensSeries.deleteMany({
        where: {
            alienId: Number(id)
        }
    });

    const item = await prisma.aliens.update({
        where: {
            id: Number(id)
        },

        data: {
            nome: data.nome,
            usuarioId: Number(data.usuarioId),

            series: {
                create: data.series.map((serie) => ({ // atualiza o registro na tabela aliensSeries para cada série associada ao alien
                    serie: serie
                }))
            }
        }
    });

    res.status(200).json(item);
};


const excluir = async (req, res) => {

    const { id } = req.params;

    await prisma.aliensSeries.deleteMany({
        where: {
            alienId: Number(id)
        }
    });

    const item = await prisma.aliens.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json(item);
};


module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir
};