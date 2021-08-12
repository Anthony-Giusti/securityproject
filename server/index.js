const express = require("express");
const { MongoClient } = require("mongodb");
const { ObjectID } = require("bson");
const cors = require("cors")

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;
let client;
let userData;

const createNewUser = async (newUser) => {
  await userData.insertOne(newUser);
};

const editUser = async (user) => {
  const result = await userData.updateOne(
    { _id: ObjectID("610d92d779431b960fc2a5fb") },
    { $set: user }
  );
};

const deleteUser = async (userId) => {
  console.log(userId);
  await userData.deleteOne({ _id: ObjectID(userId) });
};

const listBetty = async (client) => {
  //   console.log(client);
  const databases = await client.db().admin().listDatabases();

  console.log(databases.databases);
};

const getUserData = async () => {
  const response = await userData.find();
  const formattedData = await response.toArray();

  return formattedData;
};

const main = async () => {
  const uri =
    "mongodb+srv://admin:admin1234@security-project-users.xvucl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  client = new MongoClient(uri);

  try {
    await client.connect();
    userData = client.db("user-data").collection("users");

    const newBob = {
      firstName: "Bob",
      lastName: "Jobs",
      sex: "M",
      birthDay: "10-24-1995",
    };

    // await updateUser(client, 'id', newBob);

    await createNewUser(client, {
      firstName: 'Bob',
      lastName: 'Jobs',
      sex: 'M',
      birthDay: '10-24-1991',
    });

    // await deleteUser(ObjectID('610d92d779431b960fc2a5fb'));
    getUserData();

    // const dataBases = await client.db().admin().listDatabases();

    // console.log(dataBases.databases);
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
};

app.get("/getUserData", async (req, res) => {
  const response = await getUserData();
  console.log(response);
  res.send(response);
});

app.post("/createNewUser", async (req, res) => {
  const response = createNewUser(req.body.newUser);
  res.send(response);
});

app.post("/editUser", async (req, res) => {
  const reponse = editUser(req.editedUser);
});

app.get("/deleteUser", async (req, res) => {
  console.log(req.query.userId);
  const response = deleteUser(req.query.userId);

  // res.get(response);
});

main().catch(console.error);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
