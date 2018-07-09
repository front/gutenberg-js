/**
 * External Dependencies
 */
import { compact, forEach, get, has, includes, noop, startsWith } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import apiRequest from '@wordpress/api-request';

import * as others from 'gutenberg/utils/mediaupload?source=node_modules';

const { getMimeTypesArray } = others;

// required local function
function createMediaFromFile (file, additionalData) {
  // Create upload payload
  const data = new window.FormData();
  data.append('file', file, file.name || file.type.replace('/', '.'));
  forEach(additionalData, ((value, key) => data.append(key, value)));
  return apiRequest({
    path: '/wp/v2/media',
    data,
    contentType: false,
    processData: false,
    method: 'POST',
  });
}

// Added data attribute
others.mediaUpload = ({
  allowedType,
  additionalData = {},
  filesList,
  maxUploadFileSize = get(window, [ '_wpMediaSettings', 'maxUploadSize' ], 0),
  onError = noop,
  onFileChange,
})  => {
  // Cast filesList to array
  const files = [ ...filesList ];

  const filesSet = [];
  const setAndUpdateFiles = (idx, value) => {
    filesSet[ idx ] = value;
    onFileChange(compact(filesSet));
  };

  // Allowed type specified by consumer
  const isAllowedType = fileType => {
    return (allowedType === '*') || startsWith(fileType, `${allowedType}/`);
  };

  // Allowed types for the current WP_User
  const allowedMimeTypesForUser = getMimeTypesArray(get(window, [ '_wpMediaSettings', 'allowedMimeTypes' ]));
  const isAllowedMimeTypeForUser = fileType => {
    return includes(allowedMimeTypesForUser, fileType);
  };

  files.forEach((mediaFile, idx) => {
    if (! isAllowedType(mediaFile.type)) {
      return;
    }

    // verify if user is allowed to upload this mime type
    if (allowedMimeTypesForUser && ! isAllowedMimeTypeForUser(mediaFile.type)) {
      onError({
        code: 'MIME_TYPE_NOT_ALLOWED_FOR_USER',
        message: __('Sorry, this file type is not permitted for security reasons.'),
        file: mediaFile,
      });
      return;
    }

    // verify if file is greater than the maximum file upload size allowed for the site.
    if (maxUploadFileSize && mediaFile.size > maxUploadFileSize) {
      onError({
        code: 'SIZE_ABOVE_LIMIT',
        message: sprintf(
          // translators: %s: file name
          __('%s exceeds the maximum upload size for this site.'),
          mediaFile.name
        ),
        file: mediaFile,
      });
      return;
    }

    // Set temporary URL to create placeholder media file, this is replaced
    // with final file from media gallery when upload is `done` below
    filesSet.push({ url: window.URL.createObjectURL(mediaFile) });
    onFileChange(filesSet);

    return createMediaFromFile(mediaFile, additionalData).then(
      savedMedia => {
        const mediaObject = {
          alt: savedMedia.alt_text,
          caption: get(savedMedia, [ 'caption', 'raw' ], ''),
          id: savedMedia.id,
          link: savedMedia.link,
          // use get to get image title
          title: get(savedMedia, [ 'title', 'raw' ], ''),
          url: savedMedia.source_url,
          // added data property to handle with image data attributes
          data: savedMedia.data,
          mediaDetails: {},
        };
        if (has(savedMedia, [ 'media_details', 'sizes' ])) {
          mediaObject.mediaDetails.sizes = get(savedMedia, [ 'media_details', 'sizes' ], {});
        }
        setAndUpdateFiles(idx, mediaObject);
      },
      response => {
        console.log('response');
        // Reset to empty on failure.
        setAndUpdateFiles(idx, null);
        let message;
        if (has(response, [ 'responseJSON', 'message' ])) {
          message = get(response, [ 'responseJSON', 'message' ]);
        }
        else {
          message = sprintf(
            // translators: %s: file name
            __('Error while uploading file %s to the media library.'),
            mediaFile.name
          );
        }
        onError({
          code: 'GENERAL',
          message,
          file: mediaFile,
        });
      }
    );
  });
};

export * from 'gutenberg/utils/mediaupload?source=node_modules';
