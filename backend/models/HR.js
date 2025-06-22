// HR model for MongoDB

const hrCollectionName = 'hrs';

const hrSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Name is required and must be a string',
        },
        email: {
          bsonType: 'string',
          description: 'Email is required and must be a string',
        },
        password: {
          bsonType: 'string',
          description: 'Password is required and must be a string',
        },
      },
    },
  },
};

export default { hrCollectionName, hrSchema }; 