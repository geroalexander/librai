const { REACT_APP_BASE_URL } = process.env;

async function fetchRequest(path: string, options: RequestInit) {
  const url: RequestInfo = REACT_APP_BASE_URL + path;
  const res = await fetch(url, options);
  if (res.ok) return await res.json();
  else {
    const { message } = await res.json();
    console.error(`Error with path: ${path}`, message);
    return Promise.reject(message);
  }
}

export { fetchRequest };
