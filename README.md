# Excel to Flat-file

[![Release](https://github.com/epomatti/excel-to-flatfile/actions/workflows/main.yml/badge.svg)](https://github.com/epomatti/excel-to-flatfile/actions/workflows/main.yml)

A embedded Node App that converts an Excel file to a flat file.

I used this example to configure auto-publish to GitHub Packages services.

## Local development / Testing

```
mkdir .tmp
mv test.env .env
```

Testing

```
yarn test
```

## Distribution

1. Run [release.ps1](distribution/windows/release.ps1) file on a Windows machine.
2. Configure `.env` file. You must set the `DISTRIBUTION_CENTER` variable.

A workspace is configured for automatic release.
