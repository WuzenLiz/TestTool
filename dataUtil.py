num =  [num for num in range(1,10)]

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
            else:
                pass
    return data

def compareData(data,source):
    for item in data['ListNews']:
        for item0 in source:
            for key in item:
                if key in item0 and item[key] is not None:
                    if item[key] <= item0[key] :
                        return "True"
                    else:
                        return "Data in "+str(key)+"was "+str(item[key])+" but the data on server is"+str(item0[key])
                elif item[key] is None:
                    return "There is some data on server's key "+str(key)+" but data on site was not! Pls check!"