import { BASE_URL } from "./constants";

export async function makePostRequest(
  api: string,
  data: object,
  token?: string
): Promise<Response> {
  return await fetch(`${BASE_URL}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function makePatchRequest(
  api: string,
  data: object,
  token: string
): Promise<Response> {
  return await fetch(`${BASE_URL}${api}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
