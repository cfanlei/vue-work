async function test(){
    const temp = await new Promise((res,rej)=>{
        setTimeout(() => {
            console.log(10)
            res()
        }, 2000);
     
    }).then(()=>{return 1000})
    console.log(temp)
}
async function sc(){
    await test()
}
sc()