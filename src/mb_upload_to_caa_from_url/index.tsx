import { qs, qsa } from '../lib/util/dom';
import { EditNote } from '../lib/util/editNotes';
import { gmxhr } from '../lib/util/xhr';

import css from './main.scss';
import { addAtisketSeedLinks } from './atisket';
import { getMaxUrlCandidates } from './maxurl';
import { findImages } from './providers';
import { ArtworkTypeIDs, CoverArt } from './providers/base';

class StatusBanner {

    #elmt: HTMLSpanElement;

    constructor() {
        this.#elmt = <span
            id='ROpdebee_paste_url_status'
            style={{display: 'none'}}
        />;
    }

    set(message: string): void {
        this.#elmt.innerText = message;
        this.#elmt.style.removeProperty('display');
    }

    clear(): void {
        this.#elmt.innerText = '';
        this.#elmt.style.display = 'none';
    }

    get htmlElement(): HTMLSpanElement {
        return this.#elmt;
    }
}

interface FetchResult {
    fetchedUrl: string
    file: File
}


class ImageImporter {
    #banner: StatusBanner;
    #note: EditNote;
    #urlInput: HTMLInputElement;
    #doneImages: Set<string>;
    // Monotonically increasing ID to uniquely identify the image. We use this
    // so we can later set the image type.
    #lastId = 0;

    constructor() {
        this.#banner = new StatusBanner();
        this.#note = EditNote.withPreambleFromGMInfo();
        this.#urlInput = setupPage(this.#banner, this.addImagesFromUrl.bind(this));
        this.#doneImages = new Set();
    }

    async addImagesFromLocationHash() {
        const seedParams: Record<string, string> = {};
        document.location.hash.replace(/^#/, '').split('&').forEach((param) => {
            try {
                const [name, value] = param.split('=');
                seedParams[name] = decodeURIComponent(value);
            } catch (err) {
                console.error(err);
                return;
            }
        });

        if (!seedParams['artwork_url']) return;
        const url = seedParams['artwork_url'];
        const types = [];
        if (seedParams['artwork_type']) {
            const artworkTypeName = seedParams['artwork_type'] as keyof typeof ArtworkTypeIDs;
            const artworkType = ArtworkTypeIDs[artworkTypeName];
            if (typeof artworkType !== 'undefined') {
                types.push(artworkType);
            }
        }

        const result = await this.#addImages(url, types);
        if (!result) return;
        const { wasMaximised, originalFilename } = result;

        if (!url.startsWith('data:')) {
            let infoLine = url;
            if (wasMaximised) infoLine += ', maximised';
            if (seedParams['origin']) {
                infoLine += ', seeded from ' + seedParams['origin'];
            }
            this.#note.addExtraInfo(infoLine);
        }
        this.#note.fill();

        this.#clearInput(url);
        this.#banner.set(`Successfully added ${originalFilename}` + (wasMaximised ? ' (maximised)' : ''));

    }

    async addImagesFromUrl(url: string) {
        if (!url) {
            this.#banner.clear();
            return;
        }

        const result = await this.#addImages(url);
        if (!result) return;
        const { wasMaximised, originalFilename } = result;

        if (!url.startsWith('data:')) {
            this.#note.addExtraInfo(url + (wasMaximised ? ', maximised': ''));
        }
        this.#note.fill();

        this.#clearInput(url);
        this.#banner.set(`Successfully added ${originalFilename}` + (wasMaximised ? ' (maximised)' : ''));
    }

    async #addImagesFromProvider(originalUrl: string, images: CoverArt[]): Promise<{ wasMaximised: boolean, originalFilename: string } | undefined> {
        this.#banner.set(`Found ${images.length} images`);
        let wasMaximised = false;
        let successfulCount = 0;
        for (const img of images) {
            const result = await this.#addImages(img.url, img.type ?? []);
            wasMaximised ||= result?.wasMaximised ?? false;
            if (result) successfulCount += 1;
        }
        this.#clearInput(originalUrl);
        this.#banner.set(`Added ${successfulCount} images from ${originalUrl}`);
        if (!successfulCount) {
            return;
        }
        return { wasMaximised, originalFilename: `${successfulCount} images`};
    }

    async #addImages(url: string, artworkTypes: ArtworkTypeIDs[] = []): Promise<{ wasMaximised: boolean, originalFilename: string } | undefined> {
        try {
            new URL(url);
        } catch (err) {
            this.#banner.set('Invalid URL');
            return;
        }

        this.#banner.set('Searching for images…');
        let containedImages;
        try {
            containedImages = await findImages(url);
        } catch (err) {
            this.#banner.set(`Failed to search images: ${err.reason ?? err}`);
            console.error(err);
            return;
        }

        if (containedImages) {
            return this.#addImagesFromProvider(url, containedImages);
        }

        const originalFilename = url.split('/').at(-1) ?? 'image';

        // Prevent re-adding one we've already done
        if (this.#doneImages.has(url)) {
            this.#banner.set(`${originalFilename} has already been added`);
            this.#clearInput(url);
            return;
        }
        this.#doneImages.add(url);

        let result;
        try {
            result = await this.#fetchLargestImage(url);
        } catch (err) {
            this.#banner.set(`Failed to load ${originalFilename}: ${err.reason ?? err}`);
            console.error(err);
            return;
        }

        const {file, fetchedUrl} = result;
        const wasMaximised = fetchedUrl !== url;

        // As above, but also checking against maximised versions
        if (this.#doneImages.has(fetchedUrl) && wasMaximised) {
            this.#banner.set(`${originalFilename} has already been added`);
            this.#clearInput(url);
            return;
        }
        this.#doneImages.add(fetchedUrl);

        this.#enqueueImageForUpload(file, artworkTypes);
        return {
            originalFilename,
            wasMaximised
        };
    }

    #clearInput(url: string): void {
        // Clear the old input, but only if it hasn't changed since. Because
        // this is asynchronous code, it's entirely possible for another image
        // to be loading at the same time
        if (this.#urlInput.value == url) {
            this.#urlInput.value = '';
        }
    }

    async #fetchLargestImage(url: string): Promise<FetchResult> {
        for await (const imageResult of getMaxUrlCandidates(url)) {
            const candName = imageResult.filename || url.split('/').at(-1);
            try {
                this.#banner.set(`Trying ${candName}…`);
                return await this.#fetchImage(imageResult.url, candName, imageResult.headers);
            } catch (err) {
                console.error(`${candName} failed: ${err.reason ?? err}`);
            }
        }

        // Fall back on original image
        return await this.#fetchImage(url, url.split('/').at(-1) || 'image');
    }

    async #fetchImage(url: string, fileName: string, headers: Record<string, unknown> = {}): Promise<FetchResult> {
        const resp = await gmxhr({
            url,
            method: 'GET',
            responseType: 'blob',
            headers: headers,
        });

        const rawFile = new File([resp.response], fileName);

        return new Promise((resolve, reject) => {
            MB.CoverArt.validate_file(rawFile)
                .fail((error) => reject({reason: error, error}))
                .done((mimeType) => resolve({
                    fetchedUrl: url,
                    file: new File(
                        [resp.response],
                        `${fileName}.${this.#lastId++}.${mimeType.split('/')[1]}`,
                        {type: mimeType}),
                }));
        });
    }

    #enqueueImageForUpload(file: File, artworkTypes: ArtworkTypeIDs[] = []) {
        // Fake event to trigger the drop event on the drag'n'drop element
        // Using jQuery because native JS cannot manually trigger such events
        // for security reasons
        const dropEvent = $.Event('drop') as JQuery.TriggeredEvent;
        dropEvent.originalEvent = {
            dataTransfer: { files: [file] }
        } as unknown as DragEvent;

        // Note that we're using MB's own jQuery here, not a script-local one.
        // We need to reuse MB's own jQuery to be able to trigger the event
        // handler.
        $('#drop-zone').trigger(dropEvent);

        if (artworkTypes.length) {
            // Asynchronous to allow the event to be handled first
            setTimeout(() => this.#setArtworkType(file, artworkTypes), 0);
        }
    }

    #setArtworkType(file: File, artworkTypes: ArtworkTypeIDs[]) {
        // Find the row for this added image. Since we're called asynchronously,
        // we can't be 100% sure it's the last one. We find the correct image
        // via the file name, which is guaranteed to be unique since we embed
        // a unique ID into it.
        const pendingUploadRows = qsa<HTMLTableRowElement>('tbody[data-bind="foreach: files_to_upload"] > tr');
        const fileRow = pendingUploadRows.find((row) =>
            qs<HTMLSpanElement>('.file-info span[data-bind="text: name"]', row).innerText == file.name);

        // Try again if the artwork hasn't been queued yet
        if (!fileRow) {
            setTimeout(() => this.#setArtworkType(file, artworkTypes), 500);
            return;
        }

        const checkboxesToCheck = qsa<HTMLInputElement>('ul.cover-art-type-checkboxes input[type="checkbox"]', fileRow)
            .filter((cbox) => artworkTypes.includes(parseInt(cbox.value)));
        checkboxesToCheck.forEach((cbox) => {
            cbox.checked = true;
            let event = new Event('click');
            cbox.dispatchEvent(event);
        });
    }
}

function setupPage(statusBanner: StatusBanner, addImageCallback: (url: string) => void): HTMLInputElement {
    document.head.append(<style id='ROpdebee_upload_to_caa_from_url'>
        {css}
    </style>);

    const input = <input
        type='text'
        placeholder='or paste a URL here'
        size={47}
        onInput={(evt) => addImageCallback(evt.currentTarget.value.trim())}
    /> as HTMLInputElement;

    const container =
        <div className='ROpdebee_paste_url_cont'>
            {input}
            <a
                href='https://github.com/ROpdebee/mb-userscripts/blob/main/src/mb_upload_to_caa_from_url/supportedProviders.md'
                target='_blank'
            >
                Supported providers
            </a>
            {statusBanner.htmlElement}
        </div>;

    qs('#drop-zone')
        .insertAdjacentElement('afterend', container);

    return input;
}

if (document.location.hostname.endsWith('musicbrainz.org')) {
    const importer = new ImageImporter();
    if (/artwork_url=(.+)/.test(document.location.hash)) {
        importer.addImagesFromLocationHash();
    }
} else if (document.location.hostname === 'atisket.pulsewidth.org.uk') {
    addAtisketSeedLinks();
}