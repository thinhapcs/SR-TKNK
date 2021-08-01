class AuthDaos {
    constructor({ userModel }) {
      this.userModel = userModel;
  
      this.checkEmailDuplicated = this.checkEmailDuplicated.bind(this);
      this.findByEmail = this.findByEmail.bind(this);
    }
  
    async checkEmailDuplicated(email) {
      const user = await this.userModel.findOne({ email });
      return user == null || user == undefined;
    }
  
    async findByEmail(email) {
      try {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new Error("Email was not found!");
        return user;
      } catch (err) {
        return { failure: true, message: err.message }
      }
    }
  }
  
  module.exports = AuthDaos;
  