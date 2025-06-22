import mongodb from '../db/mongodb.js';
import AdminFormModel from '../models/AdminForm.js';
import { ObjectId } from 'mongodb';

const createAdminForm = async (req, res) => {
  try {
    const { formTitle, description, department, fields } = req.body;
    if (!formTitle || !description || !department || !fields) {
      return res.status(400).json({ success: false, error: 'formTitle, description, department, and fields are required' });
    }
    const db = await mongodb.connectToDatabase();
    const form = {
      formTitle,
      description,
      department,
      fields,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const resultDb = await db.collection(AdminFormModel.adminFormCollectionName).insertOne(form);
    res.status(201).json({ success: true, form: { ...form, _id: resultDb.insertedId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAdminForms = async (req, res) => {
  try {
    const db = await mongodb.connectToDatabase();
    const forms = await db.collection(AdminFormModel.adminFormCollectionName).find({}).toArray();
    res.status(200).json({ success: true, forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAdminFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await mongodb.connectToDatabase();
    const form = await db.collection(AdminFormModel.adminFormCollectionName).findOne({ _id: new ObjectId(id) });
    if (!form) {
      return res.status(404).json({ success: false, error: 'Form not found' });
    }
    res.status(200).json({ success: true, form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateAdminForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { formTitle, description, department, fields } = req.body;
    const db = await mongodb.connectToDatabase();
    const result = await db.collection(AdminFormModel.adminFormCollectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { formTitle, description, department, fields, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Form not found' });
    }
    res.status(200).json({ success: true, message: 'Form updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteAdminForm = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await mongodb.connectToDatabase();
    const result = await db.collection(AdminFormModel.adminFormCollectionName).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Form not found' });
    }
    res.status(200).json({ success: true, message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { createAdminForm, getAdminForms, getAdminFormById, updateAdminForm, deleteAdminForm }; 