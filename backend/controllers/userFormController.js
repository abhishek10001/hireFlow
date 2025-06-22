import mongodb from '../db/mongodb.js';
import UserFormModel from '../models/UserForm.js';
import cloudinary from '../db/cloudinary.js';

const submitUserForm = async (req, res) => {
  try {
    let cvUrl = null;
    if (req.file) {
      cvUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'resumes',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(req.file.buffer);
      });
    }
    const db = await mongodb.connectToDatabase();
    const form = {
      name: req.body.name,
      email: req.body.email,
      yearOfExperience: req.body.yearOfExperience,
      phone: req.body.phone,
      cv: cvUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const resultDb = await db.collection(UserFormModel.userFormCollectionName).insertOne(form);

    // Webhook logic is removed. The frontend will call the webhook directly.

    res.status(201).json({ success: true, formId: resultDb.insertedId, formData: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserForms = async (req, res) => {
  try {
    const db = await mongodb.connectToDatabase();
    const forms = await db.collection(UserFormModel.userFormCollectionName).find({}).toArray();
    res.status(200).json({ success: true, forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { submitUserForm, getUserForms }; 