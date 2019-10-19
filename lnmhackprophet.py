from fbprophet import Prophet
import requests
import pandas as pd
from datetime import datetime

def find(num): 
    i = int(num**(0.5))
    while(num%i != 0):  
        i -= 1
    return i,int(num/i)  

def mlfun (coin,time):
  s = find(time)
  mx = max(s)
  mn = min(s)
  url = "https://min-api.cryptocompare.com/data/v2/histoday?tsym=USD&limit=60&e=CCCAGG&fsym="+coin+"&aggregate="+str(mn)
  data = requests.get(url).json()["Data"]["Data"]
  df = pd.DataFrame.from_dict(data, orient='columns').drop(columns=['conversionSymbol', 'conversionType','volumefrom','volumeto'])
  df['y'] = (2*(df['close']+df['open'])+df['high']+df['low'])/6
  df = df.drop(columns=['close','high','low','open'])
  for i in range(0,len(df['time'])):
    df['time'][i] = datetime.fromtimestamp(df['time'][i])
  df.rename(columns={'time': 'ds'}, inplace=True)

  #fit the model
  model = Prophet()
  model.fit(df)

  close_prices = model.make_future_dataframe(periods=mx)
  forecast = model.predict(close_prices)

  return(float(forecast['yhat'][-1:])-float(df['y'][-1:]))/(float(df['y'][-1:]))

'''bitcoin - BTC
Litecoin - LTC
Ripple - XRP
Ethereum - ETH
Zcash - ZEC
Dashcoin - DSH
NEO - NEO
Bitcoin Cash - BCH
Dogecoin - DOGE'''
