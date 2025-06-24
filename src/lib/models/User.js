import { Model } from "sequelize"; 
import bcrypt from "bcryptjs"; 

class User extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

export default User;