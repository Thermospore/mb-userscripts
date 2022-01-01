export function urlBasename(url: string | URL, defaultBasename = ''): string {
    if (typeof url !== 'string') url = url.pathname;
    // We don't need nullish coalescing here, since the array will always have
    // at least one element, but the last element may be the empty string.
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return url.split('/').pop() || defaultBasename;
}