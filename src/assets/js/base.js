

export default{

    /**
     * new Date()转换成yyyy-mm-dd
     */
    formatDate(date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
    },

    /**
     * 随机生成密钥(32位大小写字母和数字组合)
     */
    uuid32(){
        var str = "";
        let pos=0;
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',

               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
               'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
               'u', 'v', 'w', 'x', 'y', 'z',

               'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
               'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
               'U', 'V', 'W', 'X', 'Y', 'Z'];
    
        // 随机产生
        for(var i=0; i<32; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }

        return str;
    },

    /**
     * 随机生成向量（8位数字）
     */
    vector9(){
        const str = "00000000";
        let aI = parseInt(Math.random()*100000000);//数值型
        let aS = str.substring(0,8-(aI+"").length)+aI;//字符串型aI+""转化为字符串后计算长度

        return aS;
    },

    /**
     * 版本比较
     */

    compare(versionNew,versionOld){
        const vNew = (versionNew||"").split(".");
        const vOld = (versionOld||"").split(".");
        let flag = false;

        let llength = Math.max(vNew.length,vOld.length);

        for (let index = 0; index < llength; index++) {
          let a1 = isNaN(vNew[index])?0:vNew[index];
          let a2 = isNaN(vOld[index])?0:vOld[index];

          flag = (a1 > a2);
            
        }
        console.log(flag);
        return flag;

    }

}