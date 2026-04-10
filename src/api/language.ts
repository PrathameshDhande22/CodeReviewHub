export async function getLanguages(): Promise<string[]> {
  const response = await fetch("/api/language", {
    cache: "force-cache",
  });
  return response.json();
}
