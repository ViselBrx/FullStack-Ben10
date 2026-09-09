const listar = async (req, res) => {

    const lista = [
        "CLASSICO",
        "FORCA_ALIENIGENA",
        "SUPREMACIA_ALIENIGENA",
        "HEROIS_UNIDOS",
        "OMNIVERSE"
    ]; // json com as séries disponíveis

    res.status(200).json(lista);
};

module.exports = {
    listar
};