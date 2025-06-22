import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToDatabase = async () => {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB_NAME);
};

export default { client, connectToDatabase }; 