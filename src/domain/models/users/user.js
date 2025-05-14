export class User {
    constructor({ idUser, names, phone, email, birthDay, idRole, idGender }) {
      this.id = idUser;
      this.name = names;
      this.phone = phone;
      this.email = email;
      this.birthDate = birthDay;
      this.roleId = idRole;
      this.genderId = idGender;
    }
  }
  