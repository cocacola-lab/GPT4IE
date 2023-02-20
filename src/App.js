import './App.css';
import React, { useState } from "react";

const DEFAULT_PARAMS = {
  "model": "text-davinci-003",
  "temperature": 0,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

//const SELECTED_PROMPT = "STATELESS"


function App() {

  const [structureState, setStructureState] = useState(
    [] //[{subject: '七里香', relation: '歌手', object: '人物'}]
  );

  const clearState = () => {
    setStructureState([])
  };

  const updateStructure = (update) =>{
    //setStructureState([]); //清理状态值
    //console.log(JSON.parse(JSON.stringify(structureState)));
    var current_structure = JSON.parse(JSON.stringify(structureState));
    if (update.length === 0) {
      console.log("0 output")
      return;
    }

    update.forEach(ut => {
      current_structure.push(ut);
    });
    setStructureState(current_structure);
  }

  const queryREPrompt = (prompt, prompt1, prompt2, prompt3, apiKey) => {
    console.log(lanState);
    var file = '';
    if (lanState.lanValue === 'english') {
      file ='prompts/RE-eng.prompt'
    } else {
      file ='prompts/RE-chi.prompt'
    };
    console.log(file);

    fetch(file)
      .then(response => response.text()) //response转文本->
      .then(curprompt => {
        console.log(curprompt);
        curprompt = curprompt.replace("$prompt", prompt);
        if(prompt1.length === 0){
          console.log("default relation type list");
          if (lanState.lanValue === 'english') {
            curprompt = curprompt.replace("$prompt1", "['location-located_in', 'administrative_division-country', 'person-place_lived', 'person-company', 'person-nationality', 'company-founders', 'country-administrative_divisions', 'person-children', 'country-capital', 'deceased_person-place_of_death', 'neighborhood-neighborhood_of', 'person-place_of_birth']");
          } else {
            curprompt = curprompt.replace("$prompt1", "['所属专辑', '成立日期', '海拔', '官方语言', '占地面积', '父亲', '歌手', '制片人', '导演', '首都', '主演', '董事长', '祖籍', '妻子', '母亲', '气候', '面积', '主角', '邮政编码', '简称', '出品公司', '注册资本', '编剧', '创始人', '毕业院校', '国籍', '专业代码', '朝代', '作者', '作词', '所在城市', '嘉宾', '总部地点', '人口数量', '代言人', '改编自', '校长', '丈夫', '主持人', '主题曲', '修业年限', '作曲', '号', '上映时间', '票房', '饰演', '配音', '获奖']");
          };
        } else{
          curprompt = curprompt.replace("$prompt1", prompt1);
        }

        if(prompt2.length === 0){
          console.log("default subject type list");
          if (lanState.lanValue === 'english') {
            curprompt = curprompt.replace("$prompt2", "['organization', 'person', 'location', 'country']");
          } else {
            curprompt = curprompt.replace("$prompt2", "['国家', '行政区', '文学作品', '人物', '影视作品', '学校', '图书作品', '地点', '历史人物', '景点', '歌曲', '学科专业', '企业', '电视综艺', '机构', '企业/品牌', '娱乐人物']");
          };
        } else{
          curprompt = curprompt.replace("$prompt2", prompt1);
        }

        if(prompt3.length === 0){
          console.log("default object type list");
          if (lanState.lanValue === 'english') {
            curprompt = curprompt.replace("$prompt3", "['person', 'location', 'country', 'organization', 'city']");
          } else {
            curprompt = curprompt.replace("$prompt3", "['国家', '人物', 'Text', 'Date', '地点', '气候', '城市', '歌曲', '企业', 'Number', '音乐专辑', '学校', '作品', '语言']");
          };
        } else{
          curprompt = curprompt.replace("$prompt3", prompt1);
        }

        console.log(curprompt);
        const params = { ...DEFAULT_PARAMS, prompt: curprompt };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(apiKey)
          },
          body: JSON.stringify(params)
        };
        fetch('https://api.openai.com/v1/completions', requestOptions)
          .then(response => {
            if (!response.ok) {
              switch (response.status) {
                case 401: // 401: Unauthorized: API key is wrong
                  throw new Error('Please double-check your API key.');
                case 429: // 429: Too Many Requests: Need to pay
                  throw new Error('You exceeded your current quota, please check your plan and billing details.');
                default:
                  throw new Error('Something went wrong with the request, please check the Network log');
              }
            }
            //console.log(response)
            return response.json();
          })
          .then((response) => {
            const { choices } = response;
            //console.log(choices)
            const text = choices[0].text;
            console.log(text);

            //const updates = JSON.parse(text);
            //console.log(updates);

            //updateGraph(updates);
            const reg = /\(.*?\)/g; //g表示全局搜索，会进行多次match
            var update = text.match(reg);
            if(! update){
              update = [text];
            }
            console.log(update);
            console.log(update[0])
            updateStructure(update);

            //document.getElementsByClassName("searchBar")[0].value = "";
            //document.getElementsByClassName("typeList")[0].value = "";
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false;
          }).catch((error) => {
            console.log(error);
            alert(error);
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false; //出错则释放，为了能再次使用
          });
      })
  };

  const queryNERPrompt = (prompt, prompt1, prompt2, prompt3, apiKey) => {
    console.log(lanState);
    var file = '';
    if (lanState.lanValue === 'english') {
      file ='prompts/NER-eng.prompt'
    } else {
      file ='prompts/NER-chi.prompt'
    };
    console.log(file);

    fetch(file)
      .then(response => response.text()) //response转文本-> curprompt
      .then(curprompt => {
        console.log(curprompt);
        if(prompt1.length === 0){
          console.log("default ner type list");
          if (lanState.lanValue === 'english') {
            curprompt = curprompt.replace("$prompt1", "['LOC', 'MISC', 'ORG', 'PER']");
          } else {
            curprompt = curprompt.replace("$prompt1", "['组织机构', '地点', '人物']");
          };
        } else{
          curprompt = curprompt.replace("$prompt1", prompt1);
        }

        curprompt = curprompt.replace("$prompt", prompt);
        console.log(curprompt);
        const params = { ...DEFAULT_PARAMS, prompt: curprompt };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(apiKey)
          },
          body: JSON.stringify(params)
        };
        fetch('https://api.openai.com/v1/completions', requestOptions)
          .then(response => {
            if (!response.ok) {
              switch (response.status) {
                case 401: // 401: Unauthorized: API key is wrong
                  throw new Error('Please double-check your API key.');
                case 429: // 429: Too Many Requests: Need to pay
                  throw new Error('You exceeded your current quota, please check your plan and billing details.');
                default:
                  throw new Error('Something went wrong with the request, please check the Network log');
              }
            }
            //console.log(response)
            return response.json();
          })
          .then((response) => {
            const { choices } = response;
            //console.log(choices)
            const text = choices[0].text;
            console.log(text);

            //const updates = JSON.parse(text);
            //console.log(updates);

            //updateGraph(updates);
            const reg = /\(.*?\)/g; //g表示全局搜索，会进行多次match
            var update = text.match(reg);
            if(! update){
              update = [text];
            }
            console.log(update);
            console.log(update[0])
            updateStructure(update);

            //document.getElementsByClassName("searchBar")[0].value = "";
            //document.getElementsByClassName("typeList")[0].value = "";
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false;
          }).catch((error) => {
            console.log(error);
            alert(error);
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false; //出错则释放，为了能再次使用
          });
      })
  };

  const queryEEPrompt = (prompt, prompt1, prompt2, prompt3, apiKey) => {
    console.log(lanState);
    var file = '';
    if (lanState.lanValue === 'english') {
      file ='prompts/EE-eng.prompt'
    } else {
      file ='prompts/EE-chi.prompt'
    };
    console.log(file);

    fetch(file)
    .then(response => response.text()) //response转文本-> curprompt
    .then(curprompt => {
      console.log(curprompt);
      if(prompt1.length === 0){
        console.log("default event type list");
        if (lanState.lanValue === 'english') {
          curprompt = curprompt.replace("$prompt1", "{'Personnel:Elect': ['Person', 'Entity', 'Position', 'Time', 'Place'], 'Business:Declare-Bankruptcy': ['Org', 'Time', 'Place'], 'Justice:Arrest-Jail': ['Person', 'Agent', 'Crime', 'Time', 'Place'], 'Life:Divorce': ['Person', 'Time', 'Place'], 'Life:Injure': ['Agent', 'Victim', 'Instrument', 'Time', 'Place']}");
        } else {
          curprompt = curprompt.replace("$prompt1", "{'组织行为-罢工': ['时间', '所属组织', '罢工人数', '罢工人员'], '竞赛行为-晋级': ['时间', '晋级方', '晋级赛事'], '财经/交易-涨停':['时间', '涨停股票'] , '组织关系-解雇': ['时间', '解雇方', '被解雇人员']}");
        };
      } else{
        curprompt = curprompt.replace("$prompt1", prompt1);
      }

      curprompt = curprompt.replace("$prompt", prompt);
      console.log(curprompt);
      const params = { ...DEFAULT_PARAMS, prompt: curprompt };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(apiKey)
          },
          body: JSON.stringify(params)
        };
        fetch('https://api.openai.com/v1/completions', requestOptions)
          .then(response => {
            if (!response.ok) {
              switch (response.status) {
                case 401: // 401: Unauthorized: API key is wrong
                  throw new Error('Please double-check your API key.');
                case 429: // 429: Too Many Requests: Need to pay
                  throw new Error('You exceeded your current quota, please check your plan and billing details.');
                default:
                  throw new Error('Something went wrong with the request, please check the Network log');
              }
            }
            //console.log(response)
            return response.json();
          })
          .then((response) => {
            const { choices } = response;
            //console.log(choices)
            const text = choices[0].text;
            console.log(text);

            //const updates = JSON.parse(text);
            //console.log(updates);

            //updateGraph(updates);
            const reg = /[^,{]+?:[\x20]*\{.*?\}/g; //g表示全局搜索，会进行多次match
            var update = text.match(reg);
            if(! update){
              update = [text];
            }
            console.log(update);
            console.log(update[0])
            updateStructure(update);

            //document.getElementsByClassName("searchBar")[0].value = "";
            //document.getElementsByClassName("typeList")[0].value = "";
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false;
          }).catch((error) => {
            console.log(error);
            alert(error);
            document.body.style.cursor = 'default';
            document.getElementsByClassName("generateButton")[0].disabled = false; //出错则释放，为了能再次使用
          });
      })
  };

  const queryPrompt = (prompt, prompt1, prompt2, prompt3, apiKey) => {
    console.log(taskState.taskValue);
    if (taskState.taskValue === 'RE') {
      queryREPrompt(prompt, prompt1, prompt2, prompt3, apiKey);
    } else if (taskState.taskValue === 'NER') {
      queryNERPrompt(prompt, prompt1, prompt2, prompt3, apiKey);
    } else if (taskState.taskValue === 'EE') {
      queryEEPrompt(prompt, prompt1, prompt2, prompt3, apiKey);
    } else {
      alert("Please select a task");
      document.body.style.cursor = 'default';
      document.getElementsByClassName("generateButton")[0].disabled = false;
    }
  }


  const createIE = () => {
    document.body.style.cursor = 'wait';

    document.getElementsByClassName("generateButton")[0].disabled = true;
    const prompt = document.getElementsByClassName("searchBar")[0].value;
    const prompt1 = document.getElementById("prompt1").value;
    const prompt2 = document.getElementById("prompt2").value;
    const prompt3 = document.getElementById("prompt3").value;
    var apiKey = document.getElementsByClassName("apiKeyTextField")[0].value;
    //console.log(apiKey);
    if (apiKey.length === 0){
      console.log("default open AI key");
      const temp_k = "@WITy9ios86qOmgLcFT3BlbkFJi68ofPwe9IVifL3NYgZ5";
      apiKey = "sk-nd9" + temp_k.substring(1);
      //console.log(apiKey);
    }

    queryPrompt(prompt, prompt1, prompt2, prompt3, apiKey);
  }

  const lists = structureState.map((triplet) =>
    <li key={triplet.toString()}> {triplet}</li>
  );

  // 语言选项
  const [lanState, setLanState] = useState(
    {lanValue: "english"}
  );

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    //setLanState({lanValue: event.target.value}, 
    //  () => {console.log(lanState)});
    setLanState({lanValue: event.target.value}); // 坑：set状态后，lanState值不会立即改变，因为react是渲染周期结束后才更新值。
  };

  // 任务选项
  const [taskState, setTaskState] = useState(
    {taskValue: "NER"}
  );

  const handleChange2 = (event) => {
    console.log(event);
    console.log(event.target.value);
    //setLanState({lanValue: event.target.value}, 
    //  () => {console.log(lanState)});
    setTaskState({taskValue: event.target.value}); 
  };

  // <form>能控制radio为一组。
  return (
    <div className='container'>
      <h1 className="headerText">GPT4IE </h1>
      <p className='subheaderText'>GPT4IE (GPT for Information Extraction) is a open-source and powerful IE tool. Enhanced by GPT3.5 and prompting, it aims  to automatically extract structured information from a raw sentence and make a valuable in-depth analysis of the input sentence.
      We support the following functions:</p>
      <div>
      <table>
      <tbody>
      <tr>
          <td>RE</td>
          <td>entity-relation joint extraction</td>
      </tr>
      <tr>
          <td>NER</td>
          <td>named entity recoginzation</td>
      </tr>
      <tr>
          <td>EE</td>
          <td>event extraction</td>
      </tr>
      </tbody>
      </table>
      </div>
      <p className='opensourceText'><a href="https://github.com/cocacola-lab/GPT4IE">GPT4IE is open-source, see this link for more details</a>&nbsp;🎉</p>
      <center>
        <div>
        <form>
        <input type="radio" id="zh" value="chinese" checked={lanState.lanValue === 'chinese'} 
        onChange={handleChange} /> Chinese
          <input type="radio" id="en" value="english" checked={lanState.lanValue === 'english'} 
        onChange={handleChange} /> English
        </form>
        </div>
        <div>
        <form>
        <input type="radio" id="re" value="RE" checked={taskState.taskValue === 'RE'} 
        onChange={handleChange2} /> RE
        <input type="radio" id="ner" value="NER" checked={taskState.taskValue === 'NER'} 
        onChange={handleChange2} /> NER
        <input type="radio" id="ee" value="EE" checked={taskState.taskValue === 'EE'} 
        onChange={handleChange2} /> EE
        </form>
        </div>
        <div className='inputContainer'>
          <input className="searchBar" placeholder="Input sentence..."></input>
          <input className="typeList" id="prompt1" placeholder="relation/ner/event type list;
          like ['nationality']/['LOC']/{'Life:Divorce':['Person','Time','Place']}"></input>
          <input className="typeList" id="prompt2" placeholder="Subject type list... like ['person','location']"></input>
          <input className="typeList" id="prompt3" placeholder="Object type list... like ['country','location']"></input>
          <input className="apiKeyTextField" type="password" placeholder="Enter your OpenAI API key..."></input>
          <button className="generateButton" onClick={createIE}>Generate</button>
          <button className="clearButton" onClick={clearState}>Clear</button>
        </div>
      </center>
      <div className='graphContainer'>
        <ul className='ulC'>{lists}</ul>
      </div>
      <p className='footer'>Tip: you can clear output by clicking Clear button for aesthetics
      <br></br>Note: Except for the mandatory "Input sentence" and "OpenAI API key" fields, other items can be optional.
      <br></br>We set the default relation/entity/event type list; subject type list; object type list. Change the default setting and extract specific information by reset the type lists.</p>
    </div>
  );
}

export default App;
