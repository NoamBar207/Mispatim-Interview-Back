const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const { ObjectId } = require("mongodb");

module.exports = {
  query,
  update,
  upload,
};

async function query(filterBy = {}) {
  try {
    const collection = await dbService.getCollection("user");
    var users = await collection.find().toArray();
    users = users.map((user) => {
      delete user.password;
      user.createdAt = ObjectId(user._id).getTimestamp();
      // Returning fake fresh data
      // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
      return user;
    });
    return users;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

async function update(user) {
  try {
    // peek only updatable properties
    const collection = await dbService.getCollection("user");
    await collection.replaceOne(
      { id: user.id },
      { ...user, _id: ObjectId(user._id) }
    );
    return user;
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}

async function upload(users) {
  try {
    const collection = await dbService.getCollection("user");
    collection.insert(users);
  } catch (err) {
    logger.error(`cannot upload users`, err);
    throw err;
  }
}
