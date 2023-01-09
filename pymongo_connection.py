#import requests
#from bs4 import BeautifulSoup
import pymongo
from pymongo import MongoClient

'''
res = requests.get("https://bizpro.mystrikingly.com/")
soup = BeautifulSoup(res.text, "html.parser")

'''

cluster = MongoClient("mongodb+srv://BizPro:auxK7-HxJzGaB3r@cluster0.btdw0vd.mongodb.net/?retryWrites=true&w=majority")

db = cluster["BP"]
collection_alumni = db["alumni"]

'''
collection_alumni.insert_one({
    "name": "Jim", 
    "number": "21", 
    "jobTitle": "Graphen Data Scientist Intern",
    "exp": ["臺灣大學資訊工程學系"],
    "tags": [""],
    "avater": "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_960,w_480,f_auto,q_auto/89241/385535_892520.jpeg"
})
'''

collection_article = db["article"]

f = open('article.txt', 'r')
lines = f.readlines()

nameList = []
numberList = []
jobTitleList = []
titleList = []
contentList = []
articleAvaterList = []

content = ""
num = 0
cnt = 0

while num < 28 or cnt < len(lines):
    if lines[cnt][:4] == "### ":
        cnt += 1
        continue
    if lines[cnt][:4] == "####":
        #print("Content:", content)
        content = ""
        num += 1
        data = lines[cnt].split(' ')
        print(data)
        number = data[1][:-2]
        name = data[2]
        if name[-1] == '\n':
            name = name[:-1]
        jobTitle = collection_alumni.find_one({"name": name, "number": number})['jobTitle']
        #print("number =", number)
        #print("name =", name)
        #print("jobTitle =", jobTitle)
        title_found = False
        while not title_found:
            cnt += 1
            if lines[cnt][0] != '\n':
                title_found = True
        title = lines[cnt]
        cnt += 1
        nameList.append(name)
        numberList.append(number)
        jobTitleList.append(jobTitle)
        titleList.append(title)
        #print(title)
    else:
        if lines[cnt][:3] == "![]":
            articleAvaterList.append(lines[cnt][4:-1])
            contentList.append(content)
            cnt += 1
            continue
        content += lines[cnt]
    cnt += 1



for i in range(28):
    data_dict = {
        "name": nameList[i],
        "number": numberList[i],
        "jobTitle": jobTitleList[i],
        "title": titleList[i],
        "content": contentList[i],
    }
    collection_article.insert_one(data_dict)




