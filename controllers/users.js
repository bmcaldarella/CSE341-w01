const db = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const users = await db.getDatabase()
      .collection('users')
      .find({})
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    console.error('getAll error:', err);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const user = await db.getDatabase()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('getSingle error:', err);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
};

module.exports = { getAll, getSingle };
