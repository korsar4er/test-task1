const apiUrl = "http://jsonplaceholder.typicode.com";

const get = async entity => {
  const response = await fetch(`${apiUrl}/${entity}`, { method: "GET" });
  if (response.ok) {
    console.log(response.status);
    const json = await response.json();
    return json;
  } else {
    throw new Error(`Get ${entity} response status error: ${response.status}`);
  }
};

export { get };
