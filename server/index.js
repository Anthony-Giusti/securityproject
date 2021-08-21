const express = require("express");
const { MongoClient } = require("mongodb");
const { ObjectID } = require("bson");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
let client;
let userData;

const createNewUser = async (newUser) => {
  await userData.insertOne(newUser);
};

const editUser = async (user) => {
  const result = await userData.updateOne(
    { _id: ObjectID(user._id) },
    { $set: {
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      sex: user.sex,
      lastEdit: user.lastEdit,
    } }
  );
};

const deleteUser = async (userId) => {
  console.log(userId);
  await userData.deleteOne({ _id: ObjectID(userId) });
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

  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
};

app.get("/getUserData", async (req, res) => {
  const response = await getUserData();
  res.send(response);
});

app.post("/createNewUser", async (req, res) => {
  const response = createNewUser(req.body.newUser);
  res.send(response);
});

app.post("/editUser", async (req, res) => {
  const response = editUser(req.body.editedUser);
  res.send(response);
});

app.get("/deleteUser", async (req, res) => {
  const response = deleteUser(req.query.userId);
  res.send(response);
});

main().catch(console.error);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
