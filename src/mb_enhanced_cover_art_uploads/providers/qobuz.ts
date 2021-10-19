import { assert, assertHasValue } from '@lib/util/assert';
import { safeParseJSON } from '@lib/util/json';
import { gmxhr, HTTPResponseError } from '@lib/util/xhr';

import type { CoverArt } from './base';
import { ArtworkTypeIDs, CoverArtProvider } from './base';

// Assuming this doesn't change often. If it does, we might have to extract it
// from the JS code loaded on open.qobuz.com, but for simplicity's sake, let's
// just use a constant app ID first.
const QOBUZ_APP_ID = 712109809;

interface Goodie {
    id: number;
    file_format_id: number;
    name: string;
    description: string;
    url: string;
    original_url: string;
}

// Incomplete, only what we need
interface AlbumMetadata {
    id: number;
    image: {
        large: string;  // Note: Not the original
        small: string;
        thumbnail: string;
        // TODO: What's the format of these? I tried a bunch of well-known
        // albums where you'd expect that back covers were offered (Michael
        // Jackson etc) and it's always null.
        back: unknown;
    };

    goodies?: Goodie[];
}

export class QobuzProvider extends CoverArtProvider {
    supportedDomains = ['qobuz.com', 'open.qobuz.com'];
    favicon = 'https://www.qobuz.com/favicon.ico';
    name = 'Qobuz';
    // Splitting these regexps up for each domain. www.qobuz.com includes the album
    // title in the URL, open.qobuz.com does not. Although we could make the album
    // title part optional and match both domains with the same regexp, this could
    // lead to issues with URLs like this:
    // https://open.qobuz.com/album/1234567890/related
    // Not sure if such URLs would ever occur, but using a single regexp could
    // lead to `related` being matched as the ID and the actual ID as the title.
    urlRegex = [
        /open\.qobuz\.com\/(?:.+?\/)?album\/([A-Za-z0-9]+)(?:\/|$)/,
        /album\/[^/]+\/([A-Za-z0-9]+)(?:\/|$)/,
    ];

    static idToCoverUrl(id: string): URL {
        const d1 = id.slice(-2);
        const d2 = id.slice(-4, -2);
        // Is this always .jpg?
        const imgUrl = `https://static.qobuz.com/images/covers/${d1}/${d2}/${id}_org.jpg`;
        return new URL(imgUrl);
    }

    static async getMetadata(id: string): Promise<AlbumMetadata> {
        const resp = await gmxhr(`https://www.qobuz.com/api.json/0.2/album/get?album_id=${id}&offset=0&limit=20`, {
            headers: {
                'x-app-id': QOBUZ_APP_ID,
            },
        });

        const metadata = safeParseJSON<AlbumMetadata>(resp.responseText, 'Invalid response from Qobuz API');
        assert(metadata.id.toString() === id, `Qobuz returned wrong release: Requested ${id}, got ${metadata.id}`);

        return metadata;
    }

    static extractGoodies(goodie: Goodie): CoverArt {
        // Livret Numérique = Digital Booklet
        const isBooklet = goodie.name.toLowerCase() === 'livret numérique';
        return {
            url: new URL(goodie.original_url),
            types: isBooklet ? [ArtworkTypeIDs.Booklet] : [],
            comment: isBooklet ? 'Qobuz booklet' : goodie.name,
        };
    }

    async findImages(url: URL): Promise<CoverArt[]> {
        const id = this.extractId(url);
        assertHasValue(id);

        // eslint-disable-next-line init-declarations
        let metadata: AlbumMetadata;
        try {
            metadata = await QobuzProvider.getMetadata(id);
        } catch (err) {
            // We could use the URL rewriting technique to still get the cover,
            // but if we do that, we'd have to swallow this error. It's better
            // to just throw here, IMO, so we could fix any error.
            if (err instanceof HTTPResponseError && err.statusCode == 400) {
                // Bad request, likely invalid app ID.
                // Log the original error silently to the console, and throw
                // a more user friendly one for displaying in the UI
                console.error(err);
                throw new Error('Bad request to Qobuz API, app ID invalid?');
            }

            throw err;
        }

        const goodies = (metadata.goodies ?? []).map(QobuzProvider.extractGoodies);
        const coverUrl = metadata.image.large.replace(/_\d+\.([a-zA-Z0-9]+)$/, '_org.$1');
        return [
            {
                url: new URL(coverUrl),
                types: [ArtworkTypeIDs.Front],
            },
            ...goodies,
        ];
    }
}