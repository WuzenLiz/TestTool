from flask import Flask,app,request,jsonify
from selectorlib.selectorlib import Extractor
from bs4 import BeautifulSoup
from dataUtil import serializerData

app = Flask(__name__)
#Data stub
def extractData(htmlSet,site):
    loadCfg = './ExtractorConfig/'+str(site)+'Config.yaml'
    e  = Extractor.from_yaml_file(loadCfg)
    try:
        data = e.extract(htmlSet)
        if data:
            data=serializerData(data)
            return data
        else:
            return "None content here"
    except Exception as e:
        return "Somehow it error"  

def sqlData():
    pass    

@app.route('/')
def index():
    return jsonify("Hello?")

@app.route('/compare/')
def compareLift():
    site = request.args.get('site')
    htmlSet = request.data
    if htmlSet and site:   
        htmlPrase = str(BeautifulSoup(htmlSet,"lxml"))
        data = extractData(htmlPrase,site)
        return jsonify(data)
    else:
        return jsonify("There is something missing")
            

if __name__ == '__main__':
    app.run(debug=True)
    