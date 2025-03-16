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
    const data = await fetch(`${BACKEND_URL}/api/auth/new`, {
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

export async function getNotes(token) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/note/all`, {
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

export async function createNote(token, note) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/note/create_note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(note),
    });

    if (!data.ok) {
      return false;
    }
    return await data.json();
  } catch (error) {
    return null;
  }
}


export async function updateNote(token, id, note) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/note/put/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(note),
    });

    if (!data.ok) {
      return false;
    }
    return await data.json();
  } catch (error) {
    return null;
  }
}

export async function deleteNote(token, id) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/note/delete/${id}`, {
      method: "DELETE",
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