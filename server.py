import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
df = pd.read_csv(r'ProgettoBul\stato_lavori.csv', sep=';', encoding='UTF-8')
df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)
df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')
df['Regione'].str.lower()
 
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

@app.route('/future-construction-site/italy', methods=['GET'])
def get_future_construction_site_italy():
    open_fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts().to_dict()
    open_fwa = df[df['FWA'] == 1]['Regione'].value_counts().to_dict()
    
    programmed_fibra_cablata = df[df['Stato Fibra'].str.contains(str_prog, na=False)]['Regione'].value_counts().to_dict()
    programmed_fwa = df[df['Stato FWA'].str.contains(str_prog, na=False)]['Regione'].value_counts().to_dict()

    # Creazione della risposta JSON
    res = jsonify({
        "Cantieri aperti": {'Fibra': open_fibra_cablata, 'FWA': open_fwa},
        "Cantieri programmati": {'Fibra': programmed_fibra_cablata, 'FWA': programmed_fwa},
    })

    return res

@app.route('/fwa-vs-fibra/italy', methods=['GET'])
def get_fwa_vs_fibra_italy():
    valori_fibra = df[(df['Fibra'] == 1) & (df['Piano fibra (anno)'] != 0)]['Piano fibra (anno)'].value_counts().sort_index().to_dict()
    valori_fwa = df[(df['FWA'] == 1) & (df['Piano FWA (anno)'] != 0)]['Piano FWA (anno)'].value_counts().sort_index().to_dict()
    valori_df = pd.DataFrame({'Fibra': valori_fibra, 'FWA': valori_fwa})
    
    # Calcolo dell'incremento % per fibra
    df_incr_fiber = pd.DataFrame({'Valori': valori_fibra})
    df_incr_fiber.loc[2019, 'Incremento'] = 0
    for i in range(2020, 2024):
        nuovo_valore = ((df_incr_fiber.loc[i, 'Valori'] - df_incr_fiber.loc[i-1, 'Valori']) / df_incr_fiber.loc[i-1, 'Valori']) * 100 
        df_incr_fiber.loc[i, 'Incremento'] = nuovo_valore
        
    # Calcolo dell'incremento % per FWA
    df_incr_fwa = pd.DataFrame({'Valori': valori_fwa})
    df_incr_fwa.loc[2018, 'Incremento'] = 0
    for i in range(2019, 2023):
        nuovo_valore = ((df_incr_fwa.loc[i, 'Valori'] - df_incr_fwa.loc[i-1, 'Valori']) / df_incr_fwa.loc[i-1, 'Valori']) * 100 
        df_incr_fwa.loc[i, 'Incremento'] = nuovo_valore
        
    # Conversione dei DataFrame in dizionari
    incr_fiber_dict = df_incr_fiber.to_dict(orient='index')
    incr_fwa_dict = df_incr_fwa.to_dict(orient='index')
    
    # Costruzione della risposta JSON
    res = jsonify({
        "andamento": {
            "fibra": valori_fibra,
            "fwa": valori_fwa
        },
        "incremento": {
            "fibra": incr_fiber_dict,
            "fwa": incr_fwa_dict
        }
    })
    
    return res

@app.route('/fwa-construction-site/<region>', methods=['GET'])
def get_fwa_construction_site_region(region:str):
    
    df_region = df[df['Regione'] == region]
    terminati = df_region[(df_region['Stato FWA'].str.contains(str_term, na=False)) & (df_region['FWA'] != 0)]['Provincia'].value_counts().sort_index().fillna(0).to_dict()
    in_esecuzione = df_region[(df_region['Stato FWA'].str.contains(str_esec, na=False)) & (df_region['FWA'] != 0)]['Provincia'].value_counts().sort_index().fillna(0).to_dict()
    in_progettazione = df_region[(df_region['Stato FWA'].str.contains(str_prog, na=False)) & (df_region['FWA'] != 0)]['Provincia'].value_counts().sort_index().fillna(0).to_dict()
    
    res = jsonify({
        "FWA" : {'In progettazione': in_progettazione, 'In esecuzione': in_esecuzione, 'Terminati': terminati}
    })
    
    return res

if __name__ == '__main__':
    app.run(debug=True)