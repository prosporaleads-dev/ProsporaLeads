export async function apiRequest<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(errorBody || `API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T = unknown>(
  input: RequestInfo | URL,
  body: unknown,
): Promise<T> {
  return apiRequest<T>(input, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
