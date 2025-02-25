export const getUser = (username: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("isLoggedIn", "true");
    return users.find((user: { username: string; password: string }) => user.username === username);
  };
  
  export const saveUser = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  };
  