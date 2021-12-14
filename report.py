import pandas as pd

# file = 'data/test.csv'
file = 'data/2021_12_14_Daten.csv'

df = pd.read_csv(
    file,
    skipinitialspace=True,
    index_col=["date"],
    usecols=["date", "faelle_covid_aktuell", "faelle_covid_aktuell_invasiv_beatmet", "betten_frei", "betten_belegt"]
)

date_grouped = df.groupby('date').sum()
print(date_grouped)

date_grouped.reset_index().to_csv('date_grouped.csv')
