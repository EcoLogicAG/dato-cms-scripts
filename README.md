# DatoCMS Scripts

Repo with a Backup Script as an Example

## Installation

Clone the repository, and then 

```
cd dato-cms-scripts
npm install
```

## Create a Complete Backup of your DatoCMS Records (in JSON)

Add your **API Key** in the `scripts/complete-backup.ts` file

```
cd dato-cms-scripts
npm run complete-backup
```

## Example Script: Update a Boolean Value of all Records

Add your **API Key** and change the **Record Type Id**  in the `scripts/update-records.ts` file
(and of course you have to add a new interface for the record type and change some code)

```
cd dato-cms-scripts
npm run update-records
```
