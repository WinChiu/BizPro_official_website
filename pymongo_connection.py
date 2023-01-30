#import requests
#from bs4 import BeautifulSoup
import pymongo
from pymongo import MongoClient

'''
res = requests.get("https://bizpro.mystrikingly.com/")
soup = BeautifulSoup(res.text, "html.parser")

'''

def find_major(job, exp):
    major = ""
    if job[:4] == '臺灣大學' or job[:4] == '台灣大學':
        major = job
        #print(job[:4])
    else:
        idx = 0
        idxList = []
        for e in exp:
            #print("e[:4] =", e[:4])
            if (e[:4] == '臺灣大學' or '台灣大學'):
                if e[-1] == '所':
                    #print(e)
                    return e
                if e[-1] == '系':
                    #print(e)
                    return e
                if e[-2] == '系':
                    major = e.split('、')[0]
                    #print(major)
    if major == "":
        major = "Unknown"
        print("Unknown")
    return major

cluster = MongoClient("mongodb+srv://BizPro:Tl0nWi08cfVtIX7m@cluster0.btdw0vd.mongodb.net/BP?retryWrites=true&w=majority")

db = cluster["BP"]
collection_alumni = db["alumni"]
tmp_collection = db["alumni_temp"]
#new_values = {"$rename", {"avater": "avatar"}}
#collection_alumni.update_many({}, new_values)

alimni_data = tmp_collection.find()
cnt = 0
nameList = []
numberList = []
jobTitleList = []
titleList = []
expList = []
contentList = []
tagsList = []
avatarList = []
articleAvatarList = []
majorList = []
#f = open('alumni_data.txt', 'w')

for data in alimni_data:
    cnt += 1
    if cnt > 125:
        break
    nameList.append(data['name'])
    numberList.append(data['number'])
    jobTitleList.append(data['jobTitle'])
    expList.append(data['exp'])
    avatarList.append(data['avatar'])
    majorList.append(data['major'])
    #majorList.append(find_major(data['jobTitle'], data['exp']))

for i in range(cnt-1):
    alumni_dict = {
        "name": nameList[i],
        "number": numberList[i],
        "jobTitle": jobTitleList[i],
        "exp": expList[i],
		"tags": [], 
        "avatar": avatarList[i],
        "major": majorList[i],
    }
    collection_alumni.insert_one(alumni_dict)
'''
collection_alumni.insert_one({
    "name": "Jim", 
    "number": "21", 
    "jobTitle": "Graphen Data Scientist Intern",
    "exp": ["臺灣大學資訊工程學系"],
    "tags": [""],
    "avatar": "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_960,w_480,f_auto,q_auto/89241/385535_892520.jpeg"
})


collection_article = db["article"]

f = open('article.txt', 'r')
lines = f.readlines()

nameList = []
numberList = []
jobTitleList = []
titleList = []
contentList = []
tagsList = []
articleAvatarList = []

content = ""
tags = []
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
        alumni = collection_alumni.find_one({"name": name, "number": number})
        jobTitle = alumni['jobTitle']
        tagsList.append(alumni['tags'])
        print(alumni['tags'])
        #print("number =", number)
        #print("name =", name)
        #print("jobTitle =", jobTitle)
        title_found = False
        while not title_found:
            cnt += 1
            if lines[cnt][0] != '\n':
                title_found = True
        # check the character '「 '
        title = lines[cnt]
        s_count = 0
        for c in title:
            s_count	+= 1	
            if c == '「':
                title = title[s_count:-2]
        print(title)
        cnt += 1
        nameList.append(name)
        numberList.append(number)
        jobTitleList.append(jobTitle)
        titleList.append(title)
        #print(title)
    else:
        if lines[cnt][:3] == "![]":
            articleAvatarList.append(lines[cnt][4:-2])
            contentList.append(content)
            cnt += 1
            continue
        content += lines[cnt]
    cnt += 1

#print(type(tagsList[0]))


for i in range(28):
    data_dict = {
        "name": nameList[i],
        "number": numberList[i],
        "jobTitle": jobTitleList[i],
        "title": titleList[i],
        "content": contentList[i],
		"tags": tagsList[i], 
        "avatar": articleAvatarList[i],
    }
    collection_article.insert_one(data_dict)


'''