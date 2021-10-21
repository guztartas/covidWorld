import errorTexts from "constants/errorTexts";

const login = ({ email, password }) => {
  if (email === "gustavo@admin.com" && password === "admin") {
    return { token: "1234" };
  }
  return { error: errorTexts.person.emailOrPassword };
};

export default login;
