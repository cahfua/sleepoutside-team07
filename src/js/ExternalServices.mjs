async function convertToJson(res) {
  const jsonResponse = await res.json();  // <-- ALWAYS read body

  if (res.ok) {
    return jsonResponse;
  }

  // Not OK → throw custom error object
  throw {
    name: "servicesError",
    message: jsonResponse   // ← this contains ALL error details from server
  };
}
