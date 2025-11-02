const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');



const dbmod = require('../data/database');

router.get('/__debug', async (req, res) => {
  try {
    const d = dbmod.getDatabase();
    const cols = await d.listCollections().toArray();
    const count = await d.collection('contacts').countDocuments();
    res.json({
      dbName: d.databaseName,
      collections: cols.map(c => c.name),
      contactsCount: count
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
/**
 * @openapi
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', contactsController.getAll);


/**
 * @openapi
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the contact to retrieve
 *     responses:
 *       200:
 *         description: contact finded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactsController.getSingle);

/**
 * @openapi
 * /api/contacts:
 *   post:
 *     summary: create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: contact created successfully
 *       400:
 *         description: inputs are missing/invalid
 */

router.post('/', contactsController.createOne);
/**
 * @openapi
 * /api/contacts/{id}:
 *   put:
 *     summary: Update an existing contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: input data is missing/invalid
 *       404:
 *         description: Contact not found
 */


router.put('/:id', contactsController.updateOne);

/**
 * @openapi
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact to delete
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */


router.delete('/:id', contactsController.deleteOne);

module.exports = router;
