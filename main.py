import re
from flask import Flask,app, json,request,jsonify
from selectorlib.formatter import Formatter
from selectorlib.selectorlib import Extractor
from bs4 import BeautifulSoup
from dataUtil import mergeData, serializerData

#define Stub
app = Flask(__name__)
localData = []
with open("./soha-newspublish.json") as oFile:
    localData = json.load(oFile)

class AvatarUrl(Formatter):
    def format(self, text):
        return re.findall(r'\'(.+?)\'',str(text))[0]

#Data stub
def extractData(htmlSet,site):
    loadCfg = './ExtractorConfig/'+str(site)+'Config.yaml'
    formatters = Formatter.get_all()
    e  = Extractor.from_yaml_file(loadCfg,formatters=formatters) 
    # data = e.extract(htmlSet)
    # data = mergeData(data)
    # data = serializerData(data)
    try:
        data = e.extract(htmlSet)
        if data:
            data = mergeData(data)
            # data = serializerData(data)
            return data
        else:
            return "None content here"
    except Exception as e:
        return "Somehow it error"  

def sqlData():
    pass    


@app.route('/')
def index():
    site = request.args.get('site')
    htmlSet = request.data
    if htmlSet and site:   
        htmlPrase = BeautifulSoup(htmlSet,"lxml")
        data = extractData(str(htmlPrase),site)
        # if compareData(data):
        #     return jsonify('True')
        # else:
        return jsonify(data)
    else:
        return jsonify("There is something missing")
            

if __name__ == '__main__':
    app.run(debug=True)
    