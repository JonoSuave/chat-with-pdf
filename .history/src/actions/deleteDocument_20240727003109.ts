export async function deleteDocument(collection: string, id: string) {
    const res = await fetch(`/api/deleteDocument?collection=${collection}&id=${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
}