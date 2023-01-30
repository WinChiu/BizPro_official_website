import os
import requests
import pymongo
from pymongo import MongoClient

dir = './alumni_image'
if not os.path.exists(dir):
    os.mkdir(dir)
os.chdir(dir)

cluster = MongoClient("mongodb+srv://BizPro:Tl0nWi08cfVtIX7m@cluster0.btdw0vd.mongodb.net/BP?retryWrites=true&w=majority")

db = cluster["BP"]
collection_alumni = db["alumni"]

alumni_data = collection_alumni.find()

for alumni in alumni_data:
    url = alumni['avatar']
    img = requests.get(url).content
    file_name = alumni['number'] + '_' + alumni['name'] + '.jpg'
    with open(file_name, 'wb') as handler:
        handler.write(img)