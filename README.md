# GPT4IE
## Description (website link in upper right corner; Open-AI key we offered in bottom.)
GPT4IE (GPT for Information Extraction) is a open-source and powerful IE tool [demo](https://cocacola-lab.github.io/GPT4IE/). Enhanced by GPT3.5 and prompting, it aims to automatically extract **structured information** from a **raw sentence** and make a valuable in-depth analysis of the input sentence. Harnessing valuable structured information helps corporations make incisive and business–improving decisions.

We support the following functions:
| Task | Name| Lauguages |
|---| ---| --- |
| RE | entity-relation joint extraction | Chinese, English|
|NER |named entity recoginzation | Chinese, English|
|EE| event extraction | Chinese, English|

### RE
This task aims to extract triples from plain texts, such as **(China, capital, Beijing)** , **(《如懿传》, 主演, 周迅)**.
#### Input
- sentence: a plain text.
- relation type list (rtl)* : ['relation type 1', 'relation type 2', ...]
- subject type list (stl)* : ['subject type 1', 'subject type 2', ...]
- object type list (otl)* : ['object type 1', 'object type 2', ...]

PS: * denote optional, we set default value for them. But for better extraction, you should specify the three list according to application scenarios.
#### Examples
**sentence:** Bob worked for Google in Beijing, the capital of China.  
**rtl:** ['location-located_in', 'administrative_division-country', 'person-place_lived', 'person-company', 'person-nationality', 'company-founders', 'country-administrative_divisions', 'person-children', 'country-capital', 'deceased_person-place_of_death', 'neighborhood-neighborhood_of', 'person-place_of_birth']  
**stl:** ['organization', 'person', 'location', 'country']  
**otl:** ['person', 'location', 'country', 'organization', 'city']  
**ouptut:**  
![ouptut](examples/RE-eng.jpg)  

**sentence:** 第五部：《如懿传》《如懿传》是一部古装宫廷情感电视剧，由汪俊执导，周迅、霍建华、张钧甯、董洁、辛芷蕾、童瑶、李纯、邬君梅等主演。  
**rtl:** ['所属专辑', '成立日期', '海拔', '官方语言', '占地面积', '父亲', '歌手', '制片人', '导演', '首都', '主演', '董事长', '祖籍', '妻子', '母亲', '气候', '面积', '主角', '邮政编码', '简称', '出品公司', '注册资本', '编剧', '创始人', '毕业院校', '国籍', '专业代码', '朝代', '作者', '作词', '所在城市', '嘉宾', '总部地点', '人口数量', '代言人', '改编自', '校长', '丈夫', '主持人', '主题曲', '修业年限', '作曲', '号', '上映时间', '票房', '饰演', '配音', '获奖']
**stl:** ['国家', '行政区', '文学作品', '人物', '影视作品', '学校', '图书作品', '地点', '历史人物', '景点', '歌曲', '学科专业', '企业', '电视综艺', '机构', '企业/品牌', '娱乐人物']  
**otl:** ['国家', '人物', 'Text', 'Date', '地点', '气候', '城市', '歌曲', '企业', 'Number', '音乐专辑', '学校', '作品', '语言']  
**ouptut:**  
![ouptut](examples/RE-zh.jpg) 

---
### NER
This task aims to extract entities from plain texts, such as **(LOC, Beijing)** , **(人物, 周恩来)**.
#### Input
- sentence: a plain text.
- entity type list (etl)* : ['entity type 1', 'entity type 2', ...]

PS: * denote optional, we set default value for it. But for better extraction, you should specify the list according to application scenarios.
#### Examples
**sentence:** Bob worked for Google in Beijing, the capital of China.  
**etl:**  ['LOC', 'MISC', 'ORG', 'PER']  
**ouptut:**  
![ouptut](examples/NER-eng.jpg)  

**sentence:** 在过去的五年中，致公党在邓小平理论指引下，遵循社会主义初级阶段的基本路线，努力实践致公党十大提出的发挥参政党职能、加强自身建设的基本任务。   
**etl:** ['组织机构', '地点', '人物']  
**ouptut:**  
![ouptut](examples/NER-zh.jpg) 

---
### EE
This task aims to extract event from plain texts, such as **{Life-Divorce: {Person: Bob, Time: today, Place: America}}** , **{竞赛行为-晋级: {时间: 无, 晋级方: 西北狼, 晋级赛事: 中甲榜首之争}}**.
#### Input
- sentence: a plain text.
- event type list (etl)* : {'event type 1': ['argument role 1', 'argument role 2', ...], ...}

PS: * denote optional, we set default value for it. But for better extraction, you should specify the list according to application scenarios.
#### Examples
**sentence:** Yesterday Bob and his wife got divorced in Guangzhou.  
**etl:**  {'Personnel:Elect': ['Person', 'Entity', 'Position', 'Time', 'Place'], 'Business:Declare-Bankruptcy': ['Org', 'Time', 'Place'], 'Justice:Arrest-Jail': ['Person', 'Agent', 'Crime', 'Time', 'Place'], 'Life:Divorce': ['Person', 'Time', 'Place'], 'Life:Injure': ['Agent', 'Victim', 'Instrument', 'Time', 'Place']}  
**ouptut:**  
![ouptut](examples/EE-eng.jpg)  

**sentence:** 在2022年卡塔尔世界杯决赛中，阿根廷以点球大战险胜法国。  
**etl:** {'组织行为-罢工': ['时间', '所属组织', '罢工人数', '罢工人员'], '竞赛行为-晋级': ['时间', '晋级方', '晋级赛事'], '财经/交易-涨停':['时间', '涨停股票'] , '组织关系-解雇': ['时间', '解雇方', '被解雇人员']}  
**ouptut:**  
![ouptut](examples/EE-zh.jpg) 

---

## Setup

1. Run `npm install` to download required dependencies.
2. Run `npm run start`. GPT4IE should open up in a new browser tab.
3. note: node-version v14.17.4  npm-version 6.14.14
4. you need have an Open-AI key, for welfare, we give one
5. 
6.   **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**
7.   **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**

