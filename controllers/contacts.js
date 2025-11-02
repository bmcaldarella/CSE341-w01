const db = require('../data/database');
const { ObjectId } = require('mongodb');

const required = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
const hasAll = (b) => required.every(k => b?.[k]);

const getAll = async (req, res) => {
  try {
    const docs = await db.getDatabase().collection('contacts').find({}).toArray();
    res.status(200).json(docs);
  } catch (e) {
    res.status(500).json({ error: 'Error retrieving contacts' });
  }
};

const getSingle = async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);
    const doc = await db.getDatabase().collection('contacts').findOne({ _id });
    if (!doc) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(doc);
  } catch (e) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

const createOne = async (req, res) => {
  try {
    if (!hasAll(req.body)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const { insertedId } = await db.getDatabase().collection('contacts').insertOne(req.body);
    res.status(201).json({ id: insertedId });
  } catch (e) {
    res.status(500).json({ error: 'Error creating contact' });
  }
};

const updateOne = async (req, res) => {
  try {
    if (!hasAll(req.body)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const _id = new ObjectId(req.params.id);
    const { matchedCount } = await db
      .getDatabase()
      .collection('contacts')
      .updateOne({ _id }, { $set: req.body });
    if (!matchedCount) return res.status(404).json({ error: 'Contact not found' });
    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);
    const { deletedCount } = await db.getDatabase().collection('contacts').deleteOne({ _id });
    if (!deletedCount) return res.status(404).json({ error: 'Contact not found' });
    res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

module.exports = { getAll, getSingle, createOne, updateOne, deleteOne };
