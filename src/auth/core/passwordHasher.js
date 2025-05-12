import bcrypt from "bcryptjs";

export const hashPassword = async ({ password = null } = {}) => {
  const salt = await bcrypt.genSalt(10);
  console.log(password);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePasswords = async ({
  password = null,
  hashedPassword = null,
} = {}) => {
  console.log(password, hashedPassword);
  const result = await bcrypt.compare(password, hashedPassword); // true
  console.log(result);
  return result;
};
