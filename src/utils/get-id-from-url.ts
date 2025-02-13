export function getIdFromUrl(url: string): string | null {
    const pattern = /^https?:\/\/swapi\.dev\/api\/[\w-]+\/(\d+)\/?$/;
    const match = url.match(pattern);
    if (match) {
        return match[1];
    }
    return null;
}