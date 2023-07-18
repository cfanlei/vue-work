const self = this
const reqParam = {
  "type":"1",
	enterprise: {
		"fullName": "input70074",
		"sourceType": "select65196",
		"departmentType": "select105493",
		"orgFormMax": "select61353",
		"orgFormCenter": "select66649",
		"orgFormMin": "select37510",
		"enterpriseType": "select108547",
		"inOrOut": "select60899",
		"isBeListed": "select88223",
		"isIncludeSettlement": "select87596",
		"parentLegalDepartmentId": 'select103028',
		"parentManagementDepartmentId": 'select106123',
		"legalPersonLevel": "select31113",
		"managementLevel": "select46566",
		"operationStatus": "select37909",
		"continentId": "select112447",
		"countryId": "select94438",
		"stateId": "select69133",
		"cityId": "select31856",
		"regionId": "select97322",
		"manageScope": "textarea70876",
		"manageDeadlineStart": "date35974",
		"manageDeadlineEnd": "date66206",
	},
	enterpriseDetail: {
		"englishFullName": "input110055",
		"creditCode": "input106398",
		"foundDate": "date104155",
		"registeredCapital": 'input87287',
		"legalRepresentative": "input30241",
		"contactPhone": 'input58269',
		"currency": "select66891",
		"officialWebsite": 'input88128',
		"employeeNumber": 'input5556',
		"shellCompany": "select58138",
		"enterpriseShortName": "input76374",
		"enterpriseEnglishShortName": "input36799",
		"registerAddress": 'input100149',
		"operationScale": "select62922",
		"isPlatformCompany": "select121239",
		"industryName": "input37188",//
		"industryCode": "input51486",//
		"logoutType": "select91046",
		"corpCd": "input32564",
		"corpId": "select26067"
	},
	enterpriseEquityParticipationList: [],
	enterprisePersonDTO: {
		"contactName": 'input25216',
		"contactPhone": 'input50221',
		"email": 'input101209',
		"isLegalRepresentative": 'select73058'
	},
	enterpriseSuperiorHoldingsDTO:[],
	shareholderInformationList:[]
};
//编辑
const editContent = this.getParams('row')
let originUrl = null
if(editContent){
  //编辑
  originUrl = '1657224807837298688'
  reqParam.id = editContent.id
  Object.keys(reqParam).forEach(content =>{
    if(Object.prototype.toString.call(reqParam[content])==='[object Object]' ){
          for (const [key, value] of Object.entries(reqParam[content])) {
            self.getWidgetRef(value)?.setValue(editContent[content]?editContent[content][key]:'');
          }
    }else{
      if (editContent[content] !== undefined) reqParam[content] = editContent[content]
      const tableListMap = {
        enterpriseEquityParticipationList:"Table32399",
        shareholderInformationList:"Table78196",
        enterpriseSuperiorHoldingsDTO:"Table113662"
      }
      //下方表格数据回填
      if(tableListMap[content]){
        self.getWidgetRef(tableListMap[content]).gridOptions.data =reqParam[content].map(final=>{
          const finalItem = {}
          Object.keys(final).forEach(translateField=>{
            if(final[translateField]) finalItem[_.snakeCase(translateField)] = final[translateField]
          })
          return finalItem
        })
       self.getWidgetRef(tableListMap[content]).getData = ()=>{}
      }
    }
  })
  //行业名称特殊处理
  self.getWidgetRef('input37188').setValue(self.getWidgetRef(reqParam.enterpriseDetail.industryCode).getValue())
}else{
  //新增
  originUrl= '1657224606342934528'
  
}

const ele = document.querySelector('.commit-tool')
const children = ele.childNodes
const parentNode = ele.parentNode
parentNode.removeChild(ele)
//取消
const cancelBtn = document.createElement('button')
const cancelText = document.createTextNode("取消")
cancelBtn.setAttribute('class',"el-button el-button--medium el-button--default")
cancelBtn.appendChild(cancelText)
parentNode.appendChild(cancelBtn)
//提交
const btn = document.createElement('button')
const text = document.createTextNode("提交")
btn.setAttribute('class',"el-button el-button--medium el-button--primary")
btn.appendChild(text)
parentNode.appendChild(btn)


//保存并提交
const saveAndSubmitBtn = document.createElement('button')
const saveAndSubmitText = document.createTextNode("保存并提交审核")
saveAndSubmitBtn.setAttribute('class',"el-button el-button--medium el-button--primary")
saveAndSubmitBtn.appendChild(saveAndSubmitText)
parentNode.appendChild(saveAndSubmitBtn)




//居右
parentNode.setAttribute('style','text-align:right;margin:15px')

const tempComp = this.getWidgetRef('input70074')

const getInsertData = (id)=>{
  const $table = self.getWidgetRef(id).$refs.xGrid 
  const { tableData } = $table.getTableData()
  return tableData
}
const btnClick =  async (e)=>{
  let validateRes = true
  await self.getFormData().catch((e)=>{
   validateRes = false
  })
  if(validateRes !== true) {
    self.$eapNote.error({
     title: '提示',
     message: '必填字段未填写',
     duration: 3000
    });
    return  Promise.reject()
  }

    //发送请求
    const reqClone = _.cloneDeep(reqParam)
    Object.keys(reqClone.enterprise).forEach(key =>{
      const value = reqParam.enterprise[key]
      if(value !==null){
        reqClone.enterprise[key] = self.getWidgetRef(value).getValue();
      }
      if(!reqClone.enterprise[key]) delete reqClone.enterprise[key]
    })
    const namesMap = self.getParams("namesMap")
    if(editContent){
      reqClone.enterprise = {...reqClone.enterprise,...namesMap}
    }
    Object.keys(reqClone.enterpriseDetail).forEach(key =>{
      const value = reqClone.enterpriseDetail[key]
      if(value !==null){
        reqClone.enterpriseDetail[key] = self.getWidgetRef(value).getValue();
      }
      if(!reqClone.enterpriseDetail[key]) delete reqClone.enterpriseDetail[key]
    })
    //国资委
    const selectValue = self.getWidgetRef('select26067').getValue()
      //delete reqClone.enterpriseDetail.corpCd
      if(editContent&&selectValue){
        reqClone.enterpriseDetail.corpNm = self.getWidgetRef('select26067').optionItems.find(corpItem =>corpItem.id ===selectValue).name
      }
      if(selectValue){
        reqClone.enterpriseDetail.corpId = selectValue
      }else{
        delete reqClone.enterpriseDetail.corpId
      }
    //行业名称
    
    const industryNameField = self.getWidgetRef('input37188').optionItems.find(industry=>industry.id === self.getWidgetRef('input37188').fieldModel)
    reqClone.enterpriseDetail.industryName = industryNameField?.name??''
    Object.keys(reqClone.enterprisePersonDTO).forEach(key =>{
      const value = reqClone.enterprisePersonDTO[key]
      if(value !==null){
        reqClone.enterprisePersonDTO[key] = self.getWidgetRef(value).getValue()??'';
      }else{
        delete reqClone.enterprisePersonDTO[key]
      }
    })
    //参股企业
    reqClone.enterpriseEquityParticipationList = getInsertData('Table32399').map((record,index)=> ({
      id:record.id,
      departmentName:record.department_name,
      departmentType:record.department_type,
      inOrOut:record.in_or_out,
      shareholdingRatio:record.shareholding_ratio,
      index
    }))
    reqClone.enterpriseEquityParticipationList.forEach(item =>{
    if(!reqClone.enterpriseEquityParticipationList[item]) delete reqClone.enterpriseEquityParticipationList[item]
  })
    //股东信息
    reqClone.shareholderInformationList = getInsertData('Table78196').map((record,index)=> ({
      id:record.id,
      shareholderName:record.shareholder_name,
      shareholderCountryName:record.shareholder_country_name,
      shareholderPropertiesName:record.shareholder_properties_name,
      shareholderOrgFormName:record.shareholder_org_form_name,
      ownershipRatio:record.ownership_ratio
    }))
    reqClone.shareholderInformationList.forEach(item =>{
    if(!reqClone.shareholderInformationList[item]) delete reqClone.shareholderInformationList[item]
  })
    //上级控股
    reqClone.enterpriseSuperiorHoldingsDTO = getInsertData('Table113662').map((record,index) =>({
      id:record.id,
      superiorHoldingsName:record.superior_holdings_name??'',
      superiorHoldingsRatio:record.superior_holdings_ratio??'',
      index
  }))
    reqClone.enterpriseSuperiorHoldingsDTO.forEach(item =>{
    if(!reqClone.enterpriseSuperiorHoldingsDTO[item]) delete reqClone.enterpriseSuperiorHoldingsDTO[item]
  })
  
   const statusAdd =   await self.runApi(originUrl,reqClone).then(res=>{
    //判断返回结果
    if (res&&res.code===0&& !res.data?.code) {
      if(e!== "no-close"){
        //无法直接关闭,获取组件后关闭
        tempComp.closePage({pageId:'1655769385829916672'});
        tempComp.$eapNote.success({
        title: '提示',
        message: '成功',
        duration: 3000
        });
      }
    return  Promise.resolve(res)
}else{
  tempComp.$eapNote.error({
    title: '提示',
   message: res?.data?.message,
   duration: 3000
  })
  return  Promise.reject()
}
  
})
   return statusAdd
}
saveAndSubmitBtn.onclick = async ()=>{
    await btnClick("no-close").then((res,rej) =>{
    if(rej) return
    let enterpriseId = ''
    if(editContent){
      enterpriseId = editContent.id
    }else{
      enterpriseId = res?.data?.id
    }
    self.getWidgetRef('input70074').directStartProcess({
    processDefinitionId:'Process_1684137787251:11:1663121297961074688',     
    processDefinitionKey:'',				// 流程key
    condition:{enterpriseId},                           
    pageId:'1655494353492893696',                      
    needVars:false                    
})
//修改审核状态
   self.runApi('1657225463134384128',{id:enterpriseId}).then(res=>{
       //无法直接关闭,获取组件后关闭
        tempComp.closePage({pageId:'1655769385829916672'});
        tempComp.$eapNote.success({
        title: '提示',
        message: '成功',
        duration: 3000
        });
//this.openPage({pageId:'1659440004396212224',pageName:'',loadData:false,params:{company_id:row.id}},false);
  self.$eapNote.success({
      title: '提示',
      message: '已提交审核',
      duration: 3000
    });
   })

  }).catch(()=>{});
 }
btn.onclick = btnClick
cancelBtn.onclick = ()=>{tempComp.closePage({pageId:'1655769385829916672'});}