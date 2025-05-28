export class PasswordRecoveryRequest {
  constructor({ email }) {
    this.email = email;
  }
};

export class PasswordResetRequest {
  constructor({ email, code, password }) {
    this.email = email;
    this.code = code;
    this.password = password;
  }
};