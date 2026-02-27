export async function useFetch(page) {
    const data = await fetch(page)
        .then(response => response.json())
    return data
}