num =  [num for num in range(1,10)]
def serializerData(data):
    for key in data:
        data[key]=list(dict.fromkeys(data[key]))
    return data

def mergeData(data):
    for key in list(data.keys()):
        for n in num:   
            if key + str(n) in data and key in data:
                if data[key] is None:
                    data[key] = data[key+str(n)]
                    data.pop(key+str(n))
                elif data[key+str(n)] is None:
                    data.pop(key+str(n))
                else:
                    data[key]+=data[key+str(n)]
                    data.pop(key+str(n))
    return data

def compareData(data,source):
    for item in data['ListNews']:
        for item0 in source:
            pass