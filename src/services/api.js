const BACKEND_URL = "http://localhost:4000";

export async function loginUser(user) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!data.ok) {
      return false;
    }

    const response = await data.json();
    localStorage.setItem("user", response);
    return response;
  } catch (error) {
    return null;
  }
}

export async function registerUser(user) {
  try {
    const data = await fetch(`${BACKEND_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!data.ok) {
      return false;
    }
    return await data.json();
  } catch (error) {
    return null;
  }
}


export async function validartoken(token) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/auth/verificar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!data.ok) {
      return false;
    }
    return await data.json();
  } catch (error) {
    return null;
  }
}