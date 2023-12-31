const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const db = require('../data/database');

class User {
  constructor(email, password, name, isAdmin = false) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  static findById = (userId) => {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDB()
      .collection('users')
      .findOne({ _id: uid }, { projection: { password: 0 } });
  };

  getUserWithSameEmail = () => {
    return db.getDB().collection('users').findOne({ email: this.email });
  };

  existsAlready = async () => {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) return true;
    return false;
  };

  signup = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    const user = await db.getDB().collection('users').insertOne({
      name: this.name,
      email: this.email,
      password: hashedPassword,
      isAdmin: this.isAdmin,
    });

    return user;
  };

  hasMatchingPassword = (hashedPassword) => {
    return bcrypt.compare(this.password, hashedPassword);
  };

  static delete = (uid) => {
    const userId = new mongodb.ObjectId(uid);
    return db.getDB().collection('users').deleteOne({ _id: userId });
  };

  static findAll = async () => {
    const users = await db.getDB().collection('users').find().toArray();

    return users.map((userDocument) => {
      return new User(userDocument);
    });
  };
}

module.exports = User;
