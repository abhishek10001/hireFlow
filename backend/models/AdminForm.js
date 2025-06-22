// AdminForm model for MongoDB using native driver

const adminFormCollectionName = 'adminForms';

const adminFormSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'formTitle',
        'description',
        'department',
        'fields'
      ],
      properties: {
        formTitle: {
          bsonType: 'string',
          description: 'Form Title is required and must be a string',
        },
        description: {
          bsonType: 'string',
          description: 'Description is required and must be a string',
        },
        department: {
          bsonType: 'string',
          description: 'Department is required and must be a string',
        },
        fields: {
          bsonType: 'array',
          description: 'Fields array is required',
          items: {
            bsonType: 'object',
            required: ['id', 'type', 'label', 'required'],
            properties: {
              id: { bsonType: 'string' },
              type: { bsonType: 'string' },
              label: { bsonType: 'string' },
              required: { bsonType: 'bool' },
            },
          },
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

export default { adminFormCollectionName, adminFormSchema }; 