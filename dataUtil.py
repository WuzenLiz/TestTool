def serializerData(data):
    print(data)
    for key in data:
        data[key]=list(dict.fromkeys(data[key]))
    return data