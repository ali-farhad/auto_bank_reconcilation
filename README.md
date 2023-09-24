# Automated Bank Reconciliation

This handy little website finds matching instances between your records (vouchers, transactions etc.) to that of your banks, and spits out a new excel (.xlsx) file, with all the matching records removed out of the box. you can use this to automate the horrid process of bank reconciliation which has to happed at the end of almost every month. this site aaves a lot of Manual Tick-Off & Saves a Lot of Time!

In order to make this project work you need 3 things:
~~\* Python3~~

- nodeJS
- an .XLSX file (with bank records)
- an .XLSX file (with account book records)

# How-To (Easy-Way):

- make sure your files are ready as described below in the hard-way section
- go to: `https://road-future-softball.glitch.me/` and follow the instructions!

# How-to (Harder-Way):

- Create an excel file for your bank records
- make sure that the sheet as the exact same columns as below:

| Sr  | Cheque | Dr   | Cr    |
| --- | ------ | ---- | ----- |
| 1   | 123    | 5000 |       |
| 2   | 4567   | 9000 |       |
| 3   |        |      | -9345 |

- create an excel file for your bank book / local records
- make sure that the sheet has the exact same columns as below:

| Sr  | Cheque | Dr   | Cr    |
| --- | ------ | ---- | ----- |
| 1   | 123    | 5000 |       |
| 2   | 4567   | 9000 |       |
| 3   |        |      | -9345 |
| 2   | 34637  | 8000 |       |

- download this entire repo
- download nodeJs from https://nodejs.org/en/download
- go to the folder root and enter the following commands:
- `npm install && npm run dev`
- go to : `http://localhost:5000/`

- after the script is done, your downloaded result file will have duplicates value removed from both bank sheet and bankbook / local sheet. leaving you with unique records that will need to be reconciled manually.

# Warning:

- the order of column matters.
- the name of column matters. make sure your sheet has exact same names as shown above
- for reference, you can look into sample files placed in `public/samples` folder

#### Side Note:

~~\* I have the whole script in exe format, so if you are not concerned with all the~~

~~technical details. shoot me an email. I will be more than happy to provide you with direct .exe file~~

- want to say hello? contatct me at : alifarhad557@gmail.com

### TO-DO:

- [x] make the code more modular
- [x] create a GUI app, may be?

### Stuff used to make this:

- [SheetJs](https://www.npmjs.com/package/sheetjs) for parsing excel files

- Bootstrap 5 for styling
- Nodejs, expressJs, and EJS for the rest of functionality

### Donations

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/alifarhad)
