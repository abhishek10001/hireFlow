// UserForm model for MongoDB using native driver

const userFormCollectionName = 'userForms';

const userFormSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'createdAt',
        'updatedAt'
      ],
      properties: {
        // Dynamic fields will be stored as they come from the form
        // Only require timestamps
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp is required',
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Update timestamp is required',
        },
        cv: {
          bsonType: 'string',
          description: 'CV file URL (optional)',
        },
      },
    },
  },
};

export default { userFormCollectionName, userFormSchema }; 