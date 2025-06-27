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
    
    // Create form object with all dynamic fields from req.body
    const formData = { ...req.body };
    
    // Add file URL if file was uploaded
    if (cvUrl) {
      formData.cv = cvUrl;
    }
    
    // Add timestamps
    formData.createdAt = new Date();
    formData.updatedAt = new Date();
    
    const resultDb = await db.collection(UserFormModel.userFormCollectionName).insertOne(formData);

    // Webhook logic is removed. The frontend will call the webhook directly.

    res.status(201).json({ success: true, formId: resultDb.insertedId, formData: formData });
  } catch (error) {
    console.error('Error submitting form:', error);
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