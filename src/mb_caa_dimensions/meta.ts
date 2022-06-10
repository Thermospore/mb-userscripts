import type { UserscriptMetadata } from '@lib/util/metadata';
import { MB_EDIT_PAGE_PATHS, transformMBMatchURL } from '@lib/util/metadata';

const metadata: UserscriptMetadata = {
    name: 'MB: Display CAA image dimensions',
    description: 'Displays the dimensions and size of images in the cover art archive.',
    'run-at': 'document-start',
    match: [
        'release/*',
        'release-group/*',
        ...MB_EDIT_PAGE_PATHS,
    ].map(transformMBMatchURL),
    exclude: [
        transformMBMatchURL('release/*/edit'),
        transformMBMatchURL('release/*/edit-relationships'),
        transformMBMatchURL('release-group/*/edit'),
    ],
};

export default metadata;
