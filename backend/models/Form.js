// Form model for MongoDB using native driver

const formCollectionName = 'forms';

const formSchema = {
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
          description: 'Fields array is required and must be an array of strings',
          items: {
            bsonType: 'string',
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

export default { formCollectionName, formSchema }; 