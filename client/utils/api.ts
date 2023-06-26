import { BASE_URL } from "./constants";

export async function makePostRequest(api: string, data: object): Promise<Response> {
  return await fetch(`${BASE_URL}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
