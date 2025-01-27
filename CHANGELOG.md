# CHANGELOG


[2.1.0] / 2024-11-12
====================

### Added
- Scripts to monitor logs for an ongoing bulk operation with instructions in README
- Explicitly reporting API responses with `existing` property as `SkippedAlreadyExists` value for the `Cld_Operation` column in a migration report file

### Changed
- Updated outdated dependencies


[2.0.1] / 2024-02-09
====================

### Changed
- Updated outdated dependencies
- Added hint to the README for monitoring migration errors during execution of the script


[2.0.0] / 2023-09-27
====================

### Added
- Introduced unit tests (with Jest as a dev dependency)
- Implemented end-to-end tests
- Support for uploading local files larger than 100MB (using `upload_large` from Cloudinary SDK)

### Changed
- Renamed the tool to `cld-bulk`
- Introduced concept of sub-commands by using `commander` for parsing CLI arguments
- Extracted the async CSV input processing loop to a re-usable module


[1.0.0] / 2023-08-04
====================

### Added
- Initial release with limited migration flow support (local files only under 100MB supported)
