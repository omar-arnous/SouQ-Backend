const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const db = require('../data/database');

class User {
  constructor(email, password, name) {
    this.name = name;
    this.email = email;
    this.password = password;
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
    });

    return user;
  };

  hasMatchingPassword = (hashedPassword) => {
    return bcrypt.compare(this.password, hashedPassword);
  };
}

module.exports = User;
