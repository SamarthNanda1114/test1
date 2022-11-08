const axios = require('axios');
const fs = require('fs');




async function asyncReadFile(filename) {
    try {
      const contents = await fs.promises.readFile(filename, 'utf-8');
  
      const arr = contents.split(/\r?\n/);
  
      console.log(arr);
  
      return arr;
    } catch (err) {
      console.log(err);
    }
  }
  


async function rcNo (value){
    var config = {
        method: 'post',
        url: `https://c52bhwz0mf.execute-api.ap-south-1.amazonaws.com/default/s2-source-function?reg_no=${value}`,
        headers: { 
          'x-api-key': 'Vr4LL2Ktsl2f0Q2dexbt8al7Btv9liUi43BXh8gc'
        }
      };
    try{
        let response = await axios(config);
        return response.data;
    } catch (err){
        console.log(err);
    }
}

async function call(){
    let arr = await asyncReadFile('./no.txt');

    const n = arr.length;
    let i;
    for(i=0;i<n;i++){
        let data =await rcNo(arr[i]);
        await fs.promises.appendFile("./test",  JSON.stringify(data)+"\n"); 
    }
}
call();
