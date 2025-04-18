'use strict'

const db = require('../config/db');
const  encargado= db.encargado;

async function getencargados(req, res){
    encargado.findAll({
        where: { estado: true }
    })
    .then(result => {
        res.status(200).send({ result });
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "Sucedió un error inesperado" });
    });
}

const insertencargados = async (req, res) => {
    try {
        const encargadoData = { ...req.body, estado: true };
        const newencargado = await encargado.create(encargadoData); 
        res.status(201).json({ message: 'Encargado guardado exitosamente', data: newencargado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateencargados = async (req, res) => {
    try {
        const { encargado_id } = req.query;
        const encargadoData = req.body;

        const encargadoToUpdate = await encargado.findByPk(encargado_id);
        if (encargadoToUpdate) {
            await encargadoToUpdate.update(encargadoData);
            res.status(200).json({ message: 'Encargado actualizado exitosamente', data: encargadoToUpdate });
        } else {
            res.status(404).json({ error: 'Encargado no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteencargados = async (req, res) => {
    try {
        const { encargado_id } = req.query;

        const encargadoToDelete = await encargado.findByPk(encargado_id);
        if (encargadoToDelete) {
            await encargadoToDelete.update({ estado: false });
            res.status(200).json({ message: 'Encargado eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Encargado no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getencargados,
    insertencargados,
    updateencargados,
    deleteencargados
} 