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
#tmp_collection = db["alumni_backup"]
article_backup = db["article_backup"]

alimni_data = collection_alumni.find()
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
alumniIdDict = {}
#f = open('alumni_data.txt', 'w')

idxList = []
majorDict = {}

for data in alimni_data:
    cnt += 1
    if cnt > 125:
        break
    alumniIdDict[(data['name'], data['number'])] = data['_id']
    nameList.append(data['name'])
    numberList.append(data['number'])
    jobTitleList.append(data['jobTitle'])
    tagsList.append(data['tags'])
    expList.append(data['exp'])
    avatarList.append(data['avatar'])
    
    #idx = cnt-1

    majors = data['major']
    '''
    #majors = data['major'].split('、')
    if len(majors) > 1:
        sec_major = majors[1]
        if sec_major[-3:] == '輔修）' or sec_major[-3:] == '輔修)':
            sec_major = sec_major[:-4]
        if sec_major[-3:] == '主修）' or sec_major[-3:] == '主修)':
            sec_major = sec_major[:-5]
        print(sec_major)
        print(idx+1)
    
    for m in majors:
        if m not in majorDict:
            majorDict[m] = 1
        else:
            majorDict[m] += 1

        if m[-2:] == "學程" or m == "臺灣大學材料科學暨工程學系":
            print(idx+1)
    '''
    majorList.append(majors)

"""for key in majorDict:
    s = key + ": " + str(majorDict[key])
    #print(s)
"""
'''
for i in range(cnt):
    alumni_dict = {
        "name": nameList[i],
        "number": numberList[i],
        "jobTitle": jobTitleList[i],
        "exp": expList[i],
		"tags": tagsList[i], 
        "avatar": avatarList[i],
        "major": majorList[i],
    }
    #tmp_collection.insert_one(alumni_dict)


tmp_collection.insert_one({
    "name": "Jim", 
    "number": "21", 
    "jobTitle": "Graphen Data Scientist Intern",
    "exp": ["臺灣大學資訊工程學系"],
    "tags": [],
    "avatar": "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_960,w_480,f_auto,q_auto/89241/385535_892520.jpeg",
    "major": ["臺灣大學資訊工程學系"]
})

'''
collection_article = db["article"]

#f = open('article.txt', 'r')
#lines = f.readlines()

article_data = collection_article.find()

titleList = []
contentList = []
articleAvatarList = []
alumniIdList = []

content = ""
tags = []
num = 0
cnt = 0

for data in article_data:
    titleList.append(data['title'])
    contentList.append(data['content'])
    articleAvatarList.append(data['avatar'])
    alumniIdList.append(alumniIdDict[(data['name'], data['number'])])
    
for i in range(len(titleList)):
    articleDict = {
        "alumni": alumniIdList[i],
        "title": titleList[i],
        "content": contentList[i],
        "avatar": articleAvatarList[i],
    }
    article_backup.insert_one(articleDict)

'''

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