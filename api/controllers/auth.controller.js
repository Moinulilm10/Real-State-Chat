import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  // db operations
  const { username, email, password } = req.body;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
};
export const login = (req, res) => {
  // db operations
};
export const logout = (req, res) => {
  // db operations
};
