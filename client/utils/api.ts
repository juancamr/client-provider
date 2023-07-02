import { BASE_URL } from "./constants";

export async function makePostRequest(
  api: string,
  data: object
): Promise<Response> {
  const token = localStorage.getItem('token')
  return await fetch(`${BASE_URL}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
