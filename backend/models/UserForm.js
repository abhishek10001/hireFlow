// UserForm model for MongoDB using native driver

const userFormCollectionName = 'userForms';

const userFormSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'name',
        'email',
        'yearOfExperience',
        'phone',
        'cv'
      ],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Name is required and must be a string',
        },
        email: {
          bsonType: 'string',
          description: 'Email is required and must be a string',
        },
        yearOfExperience: {
          bsonType: 'string',
          description: 'Year of Experience is required and must be a string',
        },
        phone: {
          bsonType: 'string',
          description: 'Phone is required and must be a string',
        },
        cv: {
          bsonType: 'string',
          description: 'CV is required and must be a string (Cloudinary URL)',
        },
        createdAt: {
          bsonType: 'date',
        },
        updatedAt: {
          bsonType: 'date',
        },
      },
    },
  },
};

export default { userFormCollectionName, userFormSchema }; 