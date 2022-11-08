var axios = require('axios');
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
      method: 'get',
      url: `https://api.cuvora.com/car/partner/v3/search?vehicle_num=${value}&maxAge=0&chs&eng&mmv&altSource=true`,
      headers: { 
        'Authorization': 'Bearer YzJsbmJucDVRREl5TWw5RFlYSnBibVp2', 
        'apiKey': '$signzy@22', 
        'clientId': 'signzy'
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
        await fs.promises.appendFile("./test1.json",  JSON.stringify(data)+"\n"); 
    }
}
call();
