# Make Verbs
#
#   Take the verbs.csv file and transform into a JSON file
# -----------------------------------------------------------------------------
import json
import csv
from pprint import pprint
import unicodedata as ud
# -----------------------------------------------------------------------------
def strip_accents(s):
   return ''.join(c for c in ud.normalize('NFD', s)
                  if ud.category(c) != 'Mn')
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    verbs = {}

    conjugations = ["INF","GER","PRS.PTCP","PST.PTCP","AUX","PRS.IND.1SG","PRS.IND.2SG","PRS.IND.3SG","PRS.IND.1PL","PRS.IND.2PL","PRS.IND.3PL","IPRF.IND.1SG","IPRF.IND.2SG","IPRF.IND.3SG","IPRF.IND.1PL","IPRF.IND.2PL","IPRF.IND.3PL","PRET.IND.1SG","PRET.IND.2SG","PRET.IND.3SG","PRET.IND.1PL","PRET.IND.2PL","PRET.IND.1PL","FUT.IND.1SG","FUT.IND.2SG","FUT.IND.3SG","FUT.IND.1PL","FUT.IND.2PL","FUT.IND.3PL","COND.1SG","COND.2SG","COND.3SG","COND.1PL","COND.2PL","COND.3PL","PRS.SBJV.1SG","PRS.SBJV.2SG","PRS.SBJV.3SG","PRS.SBJV.1PL","PRS.SBJV.2PL","PRS.SBJV.3PL","IPRF.IND.1SG","IPRF.IND.2SG","IPRF.IND.3SG","IPRF.IND.1PL","IPRF.IND.2PL","IPRF.IND.3PL","IMP.1SG","IMP.2SG","IMP.3SG","IMP.1PL","IMP.2PL","IMP.3PL"]

    with open('verbs.csv') as csvfile:
        data = csv.reader(csvfile, delimiter=',')
        next(data) # burn header

        for row in data:
            if row[0] == "pouvoir":
                print(row)

            verbs[row[0]] = {key: row[conjugations.index(key)] for key in conjugations}        

    print(len(verbs.keys()))

    with open('verbs.json', 'w') as f:
        json.dump(verbs, f, ensure_ascii=False)

    # Read in the file
    with open('verbs.json', 'r') as file:
        filedata = file.read()

    # Replace the target string
    filedata = filedata.replace('},', '},\n')

    # Write the file out again
    with open('verbs.json', 'w') as file:
        file.write(filedata)
