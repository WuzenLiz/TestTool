import re
from flask import Flask,app, json,request,jsonify
from selectorlib.formatter import Formatter
from selectorlib.selectorlib import Extractor
from bs4 import BeautifulSoup
from dataUtil import compareData, mergeData
from dateutil import parser

#define Stub
app = Flask(__name__)
localData = []
with open("./soha-newspublish.json") as oFile:
    localData = json.load(oFile)

class AvatarUrl(Formatter):
    def format(self, text):
        if text:
            return re.findall(r'\'(.+?)\'',str(text))[0]

class IdUrl(Formatter):
    def format(self, text):
        if text:
            try:
                a =  re.findall(r'\-\d+\.',str(text))[0]
                return a.removeprefix('-').removesuffix('.')
            except Exception as e:
                pass

class IdUrl2(Formatter):
    def format(self, text):
        if text:
            try:
                a =  re.findall(r'\d+',str(text))[0]
                return a.removeprefix('-').removesuffix('.')
            except Exception as e:
                pass            

class timeF(Formatter):
    def format(self, text):
        if text:
            try:
                a =  parser.parse(text)
                return a.isoformat()
            except Exception as e:
                pass 

#Data stub
def extractData(htmlSet,site):
    loadCfg = './ExtractorConfig/'+str(site)+'Config.yaml'
    formatters = Formatter.get_all()
    e  = Extractor.from_yaml_file(loadCfg,formatters=formatters) 
    data = e.extract(htmlSet)
    data = mergeData(data)
    try:
        data = e.extract(htmlSet)
        # print(data)
        if data:
            # data = mergeData(data)
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
        # return jsonify(compareData(data,localData))
        return jsonify(data)
    else:
        return jsonify("There is something missing")
            

if __name__ == '__main__':
    app.run(debug=True)
    