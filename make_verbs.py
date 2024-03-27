import json
import csv
from pprint import pprint
import unicodedata as ud

def strip_accents(s):
   return ''.join(c for c in ud.normalize('NFD', s)
                  if ud.category(c) != 'Mn')

verbs = {}

with open('verbs.csv') as csvfile:
    data = csv.reader(csvfile, delimiter=',')
    pprint([(x, y) for x, y in enumerate(next(data))])
    for row in data:
        assert strip_accents(row[0])

        verbs[strip_accents(row[0])] = {
            "INF": row[0], "GER": row[1], "PRS.PTCP": row[2], "PST.PTCP": row[3],
            "IMP.1SG": row[47], "IMP.2SG": row[48], "IMP.3SG": row[49],
            "IMP.1PL": row[50], "IMP.2PL": row[51], "IMP.3PL": row[52],
            "PRS.IND.1SG": row[5], "PRS.IND.2SG": row[6], "PRS.IND.3SG": row[7],
            "PRS.IND.1PL": row[8], "PRS.IND.2PL": row[9], "PRS.IND.3PL": row[10],
            "PRS.SBJV.1SG": row[35], "PRS.SBJV.2SG": row[36], "PRS.SBJV.3SG": row[37],
            "PRS.SBJV.1PL": row[38], "PRS.SBJV.2PL": row[39], "PRS.SBJV.3PL": row[40],
            "IPRF.IND.1SG": row[11], "IPRF.IND.2SG": row[12], "IPRF.IND.3SG": row[13],
            "IPRF.IND.1PL": row[14], "IPRF.IND.2PL": row[15], "IPRF.IND.3PL": row[16],
            "IPRF.SBJV.1SG": row[41], "IPRF.SBJV.2SG": row[42], "IPRF.SBJV.3SG": row[43],
            "IPRF.SBJV.1PL": row[44], "IPRF.SBJV.2PL": row[45], "IPRF.SBJV.3PL": row[46],
            "PRET.IND.1SG": row[17], "PRET.IND.2SG": row[18], "PRET.IND.3SG": row[19],
            "PRET.IND.1PL": row[20], "PRET.IND.2PL": row[21], "PRET.IND.3PL": row[22],
            "FUT.IND.1SG": row[23], "FUT.IND.2SG": row[24], "FUT.IND.3SG": row[25],
            "FUT.IND.1PL": row[26], "FUT.IND.2PL": row[27], "FUT.IND.3PL": row[28],
            "COND.1SG": row[29], "COND.2SG": row[30], "COND.3SG": row[31],
            "COND.1PL": row[32], "COND.2PL": row[33], "COND.3PL": row[34]
        }

print(len(verbs.keys()))

with open('data.json', 'w') as f:
    json.dump(verbs, f, ensure_ascii=False)

# Read in the file
with open('data.json', 'r') as file:
    filedata = file.read()

# Replace the target string
filedata = filedata.replace('},', '},\n')

# Write the file out again
with open('data.json', 'w') as file:
    file.write(filedata)
