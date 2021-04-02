export const meQuery = async () => {
    const resp = await fetch("/api/students/me-query", {credentials: "include"})
    const data = await resp.json();
    return data;
}