# Automated Bank Reconciliation
This handy little script finds matching instanses between your records (vouchers, transactions etc) to that of your bank, and spits out a new file, with all the matching records highlighted out of the box. you can use this to automate the horrid processs of bank reconciliation which has to happed at the end of almost every month.

In order to make this script work you need 2 things:
```
 * Python  3
 * an .XLSX file (with the records)
 ```
# how-to:
* Create an excel file with two sheets. i.e. (sheet_A, sheet_B)
* copy all of your local records in "Sheet_A" in this format:

| Sr| Cheque No         | Amount  |
| ------------- |:-------------:| -----:|
|   1       | 1234567			 | 500 |
|   2       | 1234      |   100 |
| 	3       | 3124      |    200 |
* copy all of the bank records (i.e gotten from your bank) in "Sheet_B" in the same format as above:-

| Sr        | Cheque No         | Amount  |
| ------------- |:-------------:| -----:|
|   1       | 4534634		 | 345 |
|   2       | 1234      |   100 |
| 	3       | 3124      |    200 |

* copy your excel file in the same folder as the script
* go to cmd -> cd {your_directory} -> bank_recon.py
* following the instructions

# Warning:
* the order of column matters. 
* You might need to adjust the parameters, if you want to include more records, or
* switch the position of the columns

#### Side Note:
* I have the whole script in exe format, so if you are not concerned with all the
 technical details. shoot me an email. I will be more than happy to provide you with direct .exe file 
* contatct me at : alifarhad557@gmail.com



### Stuff used to make this:
 * [Openpyxl](http://openpyxl.readthedocs.io/en/default/index.html) for handling excel files
 * Python 3 - the pure love <3 
