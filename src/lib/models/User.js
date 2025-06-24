import { Model } from "sequelize"; 
import bcrypt from "bcryptjs"; 

class User extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;