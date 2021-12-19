import pandas as pd
import argparse

file = 'data/test.csv'

ap = argparse.ArgumentParser()
ap.add_argument('--file', type=str, action='store', help='CSV File')
args = vars(ap.parse_args())

if args['file']:
    file = args['file']

df = pd.read_csv(
    file,
    skipinitialspace=True,
    index_col=["date"],
    usecols=["date", "faelle_covid_aktuell", "faelle_covid_aktuell_invasiv_beatmet", "betten_frei", "betten_belegt"]
)

date_grouped = df.groupby('date').sum()
print(date_grouped)

date_grouped.reset_index().to_csv('date_grouped.csv')
