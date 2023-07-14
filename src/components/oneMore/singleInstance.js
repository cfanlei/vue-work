let  Instance  =null
class Main{
    test(){

    }
}
const  singleIns = function(){
    if(!Instance){
        Instance =  new Main()
    }
    return Instance
}

export {singleIns}