# GPT4IE
## Description
GPT4IE (GPT for Information Extraction) is a open-source and powerful IE tool. Enhanced by GPT3.5 and prompting, it aims to automatically extract **structured information** from a **raw sentence** and make a valuable in-depth analysis of the input sentence. Harnessing valuable structured information helps corporations make incisive and business–improving decisions.

We support the following functions:
| Task | Name| Lauguages |
|---| ---| --- |
| RE | entity-relation joint extraction | Chinese, English|
|NER |named entity recoginzation | Chinese, English|
|EE| event extraction | Chinese, English|

### RE
This task aims to extract triples from plain texts, such as **(China, capital, Beijing)** , **(《如懿传》, 主演, 周迅)**.
#### Input
- sentence
- relation type list (rtl)*
- subject type list (stl)*
- object type list (otl)*

PS: * denote optional, we set default value for them. But for better extraction, you should specify the three list according to application scenarios.
#### Examples
**sentence:** 第五部：《如懿传》《如懿传》是一部古装宫廷情感电视剧，由汪俊执导，周迅、霍建华、张钧甯、董洁、辛芷蕾、童瑶、李纯、邬君梅等主演。  
**rtl:** ['所属专辑', '成立日期', '海拔', '官方语言', '占地面积', '父亲', '歌手', '制片人', '导演', '首都', '主演', '董事长', '祖籍', '妻子', '母亲', '气候', '面积', '主角', '邮政编码', '简称', '出品公司', '注册资本', '编剧', '创始人', '毕业院校', '国籍', '专业代码', '朝代', '作者', '作词', '所在城市', '嘉宾', '总部地点', '人口数量', '代言人', '改编自', '校长', '丈夫', '主持人', '主题曲', '修业年限', '作曲', '号', '上映时间', '票房', '饰演', '配音', '获奖']
**stl:** ['国家', '行政区', '文学作品', '人物', '影视作品', '学校', '图书作品', '地点', '历史人物', '景点', '歌曲', '学科专业', '企业', '电视综艺', '机构', '企业/品牌', '娱乐人物']  
**otl:** ['国家', '人物', 'Text', 'Date', '地点', '气候', '城市', '歌曲', '企业', 'Number', '音乐专辑', '学校', '作品', '语言']


## Setup

1. Run `npm install` to download required dependencies.
2. Run `npm run start`. GPT4IE should open up in a new browser tab.
3. note: node-version v14.17.4  npm-version 6.14.14
