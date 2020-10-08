export const authenticationHelper = {
  registerSuccessfulLogin,
  logout,
  isUserLoggedIn,
};

function registerSuccessfulLogin(token) {
  sessionStorage.setItem("token", token);
}

function logout() {
  sessionStorage.removeItem("token");
}

function isUserLoggedIn() {
  let token = sessionStorage.getItem("token");
  if (token === null) return false;
  return true;
}
