import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import folium
import geopandas as gpd
from IPython.display import display
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
df = pd.read_csv(r'ProgettoBul\stato_lavori.csv', sep=';', encoding='UTF-8')
df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')
 
str_prog = 'in programmazione|in progettazione' # In progettazione
str_esec = 'in esecuzione' # In esecuzione
str_term = 'terminato|lavori chiusi|in collaudo' # Terminato

@app.route('/construction-site/italy', methods=['GET'])
def get_construction_site_italy():
    terminatiFO = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzioneFO = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
    in_progettazioneFO = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()

    df_filtered = df.copy(deep=True)
    df_filtered = df_filtered[(df_filtered['Piano FWA (anno)'] != 0) & (df_filtered['Fibra'] != 0)]
    df_filtered.dropna(subset=['Stato FWA'], inplace=True)
    terminatiFWA = df_filtered[(df_filtered['Stato FWA'].str.contains(str_term, na=False)) & (df_filtered['Fibra'] != 0)]['Piano FWA (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
    in_esecuzioneFWA = df_filtered[(df_filtered['Stato FWA'].str.contains(str_esec, na=False)) & (df_filtered['Fibra'] != 0)]['Piano FWA (anno)'].value_counts().sort_index()
    in_progettazioneFWA = df_filtered[(df_filtered['Stato FWA'].str.contains(str_prog, na=False)) & (df_filtered['Fibra'] != 0)]['Piano FWA (anno)'].value_counts().sort_index()

    responde = pd.DataFrame({
        "Fiber": {'In progettazione': in_progettazioneFO, 'In esecuzione': in_esecuzioneFO, 'Terminati': terminatiFO},
        "FWA": {'In progettazione': in_progettazioneFWA, 'In esecuzione': in_esecuzioneFWA, 'Terminati': terminatiFWA}
        })
    
    return responde.to_json()


@app.route('/coverage/italy', methods=['GET'])
def get_coverage_italy():
    c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
    c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1
    c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]

    # Creazione della serie
    serie_coperture = pd.Series({'Entrambe': c1_1, 'Fibra o FWA': c0_1, 'Nessuna': c0_0}).to_dict()

    # Conteggio delle regioni con stati specifici per Fibra e FWA
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts().to_dict()
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts().to_dict()

    # Creazione della risposta JSON
    res = jsonify({
        "cantieri": {'Fibra': fibra_cablata, 'FWA': fwa},
        "Cover": {"copertura" : serie_coperture},
    })

    return res

if __name__ == '__main__':
    app.run(debug=True)