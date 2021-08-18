# Excel to Flat-file 

Converts an Excel file to a flat file.

## Local development / Testing

```
mkdir .tmp
mv test.env .env
```

```
npm test
```

## Distribution

1. Run [release.pl1](distribution/windows/release.ps1) file on a Windows machine.
2. Configure `.env` file. You must set the `DISTRIBUTION_CENTER` variable.

A workspace is configured for automatic release.