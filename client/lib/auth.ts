// Authentication utilities
function hashPassword(password: string): string {
  // Simple hash function for demo purposes
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

function generateToken(userId: string): string {
  const timestamp = Date.now();
  const tokenData = { userId, timestamp };
  return btoa(JSON.stringify(tokenData));
}

function verifyToken(
  token: string,
): { userId: string; timestamp: number } | null {
  try {
    const tokenData = JSON.parse(atob(token));
    const isValid = Date.now() - tokenData.timestamp < 24 * 60 * 60 * 1000; // 24 hours
    return isValid ? tokenData : null;
  } catch (error) {
    return null;
  }
}

export function registerUser(
  email: string,
  password: string,
  username: string,
) {
  try {
    const users = JSON.parse(localStorage.getItem("weallth_users") || "[]");

    if (users.find((user: any) => user.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashPassword(password),
      username,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("weallth_users", JSON.stringify(users));

    const token = generateToken(newUser.id);
    localStorage.setItem("weallth_token", token);
    localStorage.setItem("weallth_current_user", JSON.stringify(newUser));

    return { success: true, user: newUser, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function loginUser(email: string, password: string) {
  try {
    const users = JSON.parse(localStorage.getItem("weallth_users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === hashPassword(password),
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user.id);
    localStorage.setItem("weallth_token", token);
    localStorage.setItem("weallth_current_user", JSON.stringify(user));

    return { success: true, user, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("weallth_token");
    if (!token || !verifyToken(token)) {
      return null;
    }
    return JSON.parse(localStorage.getItem("weallth_current_user") || "null");
  } catch (error) {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("weallth_token");
  localStorage.removeItem("weallth_current_user");
}
