const self = this;
const row = this.getParams('row')
debugger
const fullName = row.enterprise.fullName ?? '';
const creditCode = row.enterpriseDetail.creditCode ?? '';

//请求接口数据
let companyId = '';
let promiseArr = [];
const closeReturnData = {};
const getCompanyId = '1671408182839963648';
let givenDataIsMaped = false;
await this.runApi(getCompanyId, { fullName, creditCode }).then((res) => {
  if (!res.data?.records?.length) {
    self.$eapNote.error({
      title: '提示',
      message: '通过企业名称或社会统一信用代码未检索到企业信息。',
      duration: 3000,
    });
  } else {
    companyId = res.data.records[0].company_id;
    closeReturnData.detailInfo = res.data.records[0];
  }
});
const apiInfo = {
  basicInfo: '1672775934213320704', //基础信息
  enterpriseShareholderInfo: '1672776217127514112', //企业股东信息
  participatingEnterprises: '1672776471830818816', //参股企业
  superiorHolding: '1672776710126006272', //上级控股
  personnelInfo: '1672776941446066176', //基础及人员信息
};
const getInfo = function (url, id, key) {
  return self.runApi(url, { companyId: id }).then((res) => {
    if (res.data?.message) {
      self.$eapNote.error({
        title: '提示',
        message: res?.data?.message,
        duration: 3000,
      });
    } else {
      if (!closeReturnData[key]) {
        closeReturnData[key] = res.data.records;
      }
    }
  });
};

const main = async function () {
  Object.keys(apiInfo).forEach(async (item) => {
    const key = getInfo(apiInfo[item], companyId, item);
    promiseArr.push(key);
  });
};

main();
await Promise.allSettled(promiseArr);
//设置企业数据验证按钮
const requiredInfo = document.querySelector('.Card34852 .el-card__header');
requiredInfo.style = 'display:flex;justify-content: space-between;';
const element = document.createElement('div');
element.innerHTML = `<button type="button" id="enterpriseValidate" class="el-button el-button--primary"><span>企业数据验证</span></button>
                     <button type="button" id="fastAdd" class="el-button el-button--primary"><span>快捷添加企业</span></button>`;
requiredInfo.appendChild(element);
const enterpriseValidate = document.getElementById('enterpriseValidate');
const fastAdd = document.getElementById('fastAdd');
/*
if(!self.getParams('row')){
  enterpriseValidate.style.display= "none"
} else{
  fastAdd.style.display= "none"
}*/

const baseComparField = {
  input70074: 'company_name',
  select105493: '',
  date35974: 'business_start',
  date66206: 'business_end',
  select60899: '', //境内/外
  select112447: '',
  select94438: 'country',
  select69133: 'province',
  select31856: 'city',
  select97322: 'district',
  select37909: 'status',
  textarea70876: 'business_scope',
};
const detailComparField = {
  input106398: 'credit_code_view',
  date104155: 'register_time',
  input87287: 'actual_capital',
  input30241: 'legal_representative',
  input58269: 'tel',
  select66891: 'currency_unit_cn',
  input88128: 'website',
  input5556: 'staff_amount', //员工人数:
  input37188: 'industryType', //所属行业名称:
  input100149: 'address',
};

const enterprisePersonDTO = {
  input25216: 1,
  input50221: 1,
  input101209: 1,
  select73058: 1,
};
const tableListMap = {
  participatingEnterprises: 'Table32399',
  enterpriseShareholderInfo: 'Table78196',
  superiorHolding: 'Table113662',
};

const handlerData = async function (data) {
  if (givenDataIsMaped) return;
  givenDataIsMaped = true;
  Object.keys(baseComparField).forEach((item) => {
    if (baseComparField[item]) {
      baseComparField[item] = data.detailInfo[baseComparField[item]] ?? '';
    }
  });
  baseComparField['select105493'] =
    data.detailInfo.representative_type === '法定代表人' ? '法人单位' : '';
  baseComparField['select60899'] =
    data.detailInfo.country === '中国' ? '境内' : '境外';
  await self
    .runSql('1673992491757170688', { country: data.detailInfo.country })
    .then((res) => {
      baseComparField['select112447'] = res.data.records[0].name;
    });
  const basicInfo = { ...data.basicInfo[0], ...data.detailInfo };
  Object.keys(detailComparField).forEach((item) => {
    if (detailComparField[item]) {
      detailComparField[item] = basicInfo[detailComparField[item]] ?? '';
    }
  });
};
const handerList = async function () {
  const getNum = function (num) {
    if (num.indexOf('%') !== -1) {
      return num.replace('%', '');
    }
    const tNm = parseFloat(num);
    if (!Number.isNaN(tNm)) {
      return Math.floor(tNm * 10000) / 100;
    }
    return '';
  };
  const getStringValue = function (val) {
    if (!val) return '';
    if (typeof val === 'string') {
      return val;
    } else {
      return String(val);
    }
  };
  const baseCompar = _.cloneDeep(baseComparField);
  const detailCompar = _.cloneDeep(detailComparField);
  const baseComparList = [];
  const detailComparList = [];
  const participatingEnterprisesList = [];
  const enterpriseShareholderInfoList = [];
  const superiorHoldingList = [];
  const personInfoList = [];
  Object.keys(baseCompar).forEach((key) => {
    const comp = self.getWidgetRef(key);
    const region = baseCompar[key];
    const conditionVal =
      (comp.getShowLabel ? comp.getShowLabel() : comp.getValue()) ?? '';
    if (conditionVal?.trim() !== region?.trim()) {
      baseComparList.push({
        info_field: comp.widget.options.label.replace(':', ''),
        full_info: comp.getShowLabel ? comp.getShowLabel() : comp.getValue(),
        database_info: region,
        region_value: comp.getValueByName
          ? comp.getValueByName(region)
          : region,
        input: key,
      });
    }
  });
  Object.keys(detailCompar).forEach((key) => {
    const comp = self.getWidgetRef(key);
    const region = detailCompar[key];
    const conditionVal =
      (comp.getShowLabel ? comp.getShowLabel() : comp.getValue()) ?? '';
    if (conditionVal?.trim() !== region?.trim()) {
      detailComparList.push({
        info_field: comp.widget.options.label.replace(':', ''),
        full_info: comp.getShowLabel ? comp.getShowLabel() : comp.getValue(),
        database_info: region,
        region_value: comp.getValueByName
          ? comp.getValueByName(region)
          : region,
        input: key,
      });
    }
  });
  Object.keys(tableListMap).forEach((key) => {
    if (Array.isArray(tableListMap[key])) return;
    tableListMap[key] = self.getWidgetRef(tableListMap[key]).gridOptions.data;
  });

  //参股企业begin
  tableListMap.participatingEnterprises.forEach((item) => {
    const sameNameItem = closeReturnData.participatingEnterprises.find(
      (data) => data.investProject === item.department_name
    );
    if (sameNameItem) {
      sameNameItem.isMaped = true;
      //查到和远程数据相同的参股企业名：判断参股比例是否相同
      if (item.shareholding_ratio !== getNum(sameNameItem.percent)) {
        participatingEnterprisesList.push({
          info_field: '参股单位/持股比例',
          full_info:
            getStringValue(item.department_name) +
            '/' +
            getStringValue(item.shareholding_ratio) +
            '%',
          database_info:
            sameNameItem.investProject +
            '/' +
            getNum(sameNameItem.percent) +
            '%',
          region_value: (() => {
            const regionValue = _.cloneDeep(item);
            regionValue.department_name = getStringValue(
              sameNameItem.investProject
            );
            regionValue.shareholding_ratio = getNum(sameNameItem.percent);
            return regionValue;
          })(),
        });
      }
    } else {
      //填写的数据在远程无对应
      participatingEnterprisesList.push({
        info_field: '参股单位/持股比例',
        full_info:
          getStringValue(item.department_name) +
          '/' +
          getStringValue(item.shareholding_ratio) +
          '%',
        database_info: '',
        region_value: (() => {
          const regionValue = _.cloneDeep(item);
          regionValue.department_name = '';
          regionValue.shareholding_ratio = '';
          return regionValue;
        })(),
      });
    }
  });
  closeReturnData.participatingEnterprises.forEach((data) => {
    if (!data.isMaped) {
      participatingEnterprisesList.push({
        info_field: '参股单位/持股比例',
        full_info: '',
        database_info:
          getStringValue(data.investProject) + '/' + getNum(data.percent) + '%',
        region_value: {
          department_name: getStringValue(data.investProject),
          department_type: '',
          in_or_out: '',
          shareholding_ratio: getNum(data.percent),
        },
      });
    }
  });
  //参股企业end

  //企业股东信息begin
  const getOrgType = async function (code, name) {
    return await self
      .runSql('1658750700476850176', {
        parent_id: '427da08a0edad8348ccbf77278756158',
      })
      .then((res) => {
        const sameItemByCode = res.data.records.find(
          (item) => item.id === code
        );
        const sameItemByName = res.data.records.find(
          (item) => item.name === name
        );
        return (code ? sameItemByCode?.name : sameItemByName?.id) ?? '';
      });
  };

  for (let item of tableListMap.enterpriseShareholderInfo) {
    const sameNameItem = closeReturnData.enterpriseShareholderInfo.find(
      (data) => data.stockholderName === item.shareholder_name
    );

    const byCode = await getOrgType(item.shareholder_org_form_name);
    if (sameNameItem) {
      const byName = await getOrgType(undefined, sameNameItem.orgType);
      sameNameItem.isMaped = true;
      //查到和远程数据相同的参股企业名：判断参股比例是否相同
      if (
        item.ownership_ratio !== getNum(sameNameItem.cgbl) ||
        byCode !== sameNameItem.orgType
      ) {
        enterpriseShareholderInfoList.push({
          info_field: '股东名称/股东组织形式/股权比例',
          full_info:
            getStringValue(item.shareholder_name) +
            '/' +
            byCode +
            '/' +
            getStringValue(item.ownership_ratio) +
            '%',
          database_info:
            getStringValue(sameNameItem.stockholderName) +
            '/' +
            getStringValue(sameNameItem.orgType) +
            '/' +
            getNum(sameNameItem.cgbl) +
            '%',
          region_value: (() => {
            const regionValue = _.cloneDeep(item);
            regionValue.shareholder_name = getStringValue(
              sameNameItem.stockholderName
            );
            regionValue.ownership_ratio = getNum(sameNameItem.cgbl);
            regionValue.shareholder_org_form_name = byName;
            return regionValue;
          })(),
        });
      }
    } else {
      //填写的数据在远程无对应
      enterpriseShareholderInfoList.push({
        info_field: '股东名称/股东组织形式/股权比例',
        full_info:
          getStringValue(item.shareholder_name) +
          '/' +
          byCode +
          '/' +
          getStringValue(item.ownership_ratio) +
          '%',
        database_info: '',
        region_value: (() => {
          const regionValue = _.cloneDeep(item);
          regionValue.shareholder_name = '';
          regionValue.ownership_ratio = '';
          regionValue.shareholder_org_form_name = '';
          return regionValue;
        })(),
      });
    }
  }
  for (let data of closeReturnData.enterpriseShareholderInfo) {
    const byName = await getOrgType(undefined, data.orgType);

    if (!data.isMaped) {
      enterpriseShareholderInfoList.push({
        info_field: '股东名称/股东组织形式/股权比例',
        full_info: '',
        database_info:
          getStringValue(data.stockholderName) +
          '/' +
          getStringValue(data.orgType) +
          '/' +
          getNum(data.cgbl) +
          '%',
        region_value: {
          shareholder_name: getStringValue(data.stockholderName),
          shareholder_org_form_name: byName,
          ownership_ratio: getNum(data.cgbl),
        },
      });
    }
  }
  //企业股东信息end

  tableListMap.superiorHolding.forEach((item) => {
    const maxNum = _.maxBy(closeReturnData.superiorHolding, function (o) {
      return parseFloat(o.cgbl);
    });
    if(item.superior_holdings_name!==maxNum.stockholderName){
      superiorHoldingList.push(
        {
          info_field: '上级控股单位',
          full_info: item.superior_holdings_name,
          database_info: maxNum.stockholderName,
          region_value: {
            superior_holdings_name: maxNum.stockholderName ?? '',
          },
        })
      }
      if(item.superior_holdings_ratio!==maxNum.cgbl.replace("%","")){
        superiorHoldingList.push(
          {
            info_field: '控股比例',
            full_info: item.superior_holdings_ratio,
            database_info: getNum(maxNum.cgbl),
            region_value: {
              superior_holdings_ratio: getNum(maxNum.cgbl),
            },
          })
        }
  });

  Object.keys(enterprisePersonDTO).forEach((key) => {
    enterprisePersonDTO[key] = self.getWidgetRef(key).getValue();
  });

  if (!closeReturnData.basicInfo.length) return;
  const basicInfoItem = closeReturnData.basicInfo[0];
  if (enterprisePersonDTO['input25216'] !== basicInfoItem.legalRepresentative) {
    personInfoList.push({
      info_field: '企业联系人',
      full_info: enterprisePersonDTO['input25216'],
      database_info: basicInfoItem.legalRepresentative,
      region_value:  basicInfoItem.legalRepresentative,
      input:"input25216"
    });
  }
  if (enterprisePersonDTO['input50221'] !== basicInfoItem.tel) {
    personInfoList.push({
      info_field: '联系人电话',
      full_info: enterprisePersonDTO['input50221'],
      database_info: basicInfoItem.tel,
      region_value: basicInfoItem.tel,
      input:"input50221",
    });
  }
  debugger
  if (
    enterprisePersonDTO['input101209'] !== basicInfoItem.email
  ) {
    personInfoList.push({
      info_field: '联系人邮箱',
      full_info: enterprisePersonDTO['input101209'],
      database_info: basicInfoItem.email,
      region_value: basicInfoItem.email,
      input:  "input101209",
    });
  }
  if (enterprisePersonDTO['select73058'] !== '1') {
    personInfoList.push({
      info_field: '是否法人代表',
      full_info: enterprisePersonDTO['select73058']!== '1'?"否":"是",
      database_info: '是',
      region_value: "1",
      input:"select73058",
    });
  }
  return {
    baseComparList,
    detailComparList,
    participatingEnterprisesList,
    enterpriseShareholderInfoList,
    superiorHoldingList,
    personInfoList,
  };
};
const enterpriseClick = async function () {
  const regionData = await handlerData(closeReturnData);
  const givenData = await handerList(regionData);
  self.openDialog({
    pageId: '1673872541629509632',
    width: '1200px',
    title: '企业数据验证',
    loadData: false,
    options: {},
    params: {
      dataArr: givenData,
    },
    callbackParam: {},
    callback: (data) => {
      const selectItemObj = data.selectItemObj;
      if (selectItemObj.basicInfo) {
        selectItemObj.basicInfo.forEach((item) => {
          self.getWidgetRef(item.input).setValue(item.region_value);
        });
      }
      if (selectItemObj.detailCompar) {
        selectItemObj.detailCompar.forEach((item) => {
          self.getWidgetRef(item.input).setValue(item.region_value);
        });
      }
      if (selectItemObj.personnelInfo) {
        selectItemObj.personnelInfo.forEach((item) => {
          self.getWidgetRef(item.input).setValue(item.region_value);
        });
      }
      const tableIdMap = {
        participatingEnterprises: 'Table32399',
        enterpriseShareholderInfo: 'Table78196',
        superiorHolding: 'Table113662',
      };
      if (selectItemObj.participatingEnterprises) {
        const oldValueList = self.getWidgetRef(tableIdMap.participatingEnterprises).gridOptions.data
        const selected = selectItemObj.participatingEnterprises.map(sel =>sel.region_value)
        selected.forEach(sel=>{
          if(sel.id){
            const obj = oldValueList.find(old=>old.id ===sel.id)
            obj.department_name = sel.department_name
            obj.shareholding_ratio = sel.shareholding_ratio
          }else{
            oldValueList.push(sel)
          }
        })
        self.getWidgetRef(tableIdMap.participatingEnterprises).gridOptions.data = oldValueList
      }
      if (selectItemObj.enterpriseShareholderInfo) {
        const oldValueList = self.getWidgetRef(tableIdMap.enterpriseShareholderInfo).gridOptions.data
        const selected = selectItemObj.enterpriseShareholderInfo.map(sel =>sel.region_value)
        selected.forEach(sel=>{
          if(sel.id){
            const obj = oldValueList.find(old=>old.id ===sel.id)
            obj.shareholder_org_form_name = sel.shareholder_org_form_name
            obj.shareholder_name = sel.shareholder_name
            obj.ownership_ratio = sel.ownership_ratio
          }else{
            oldValueList.push(sel)
          }
        })
        self.getWidgetRef(tableIdMap.enterpriseShareholderInfo).gridOptions.data = oldValueList
      }
      
      if (selectItemObj.superiorHolding){
        let oldValueList = self.getWidgetRef(tableIdMap.superiorHolding).gridOptions.data 
        if(!oldValueList.length) oldValueList =[{}]
        if(oldValueList.length){
          selectItemObj.superiorHolding.forEach(sel=>{
            Object.keys(sel.region_value).forEach(s=>{
              oldValueList[0][s] = sel.region_value[s]
            })
          })
        }
        self.getWidgetRef(tableIdMap.superiorHolding).gridOptions.data = oldValueList
      }
    },
  });
};

const fastAddClick = function () {
  self.openDialog({
    pageId: '1673943616900001792',
    width: '1200px',
    title: '新增',
    loadData: false,
    options: {},
    params: {},
    callbackParam: {},
    callback: () => {},
  });
};
enterpriseValidate.onclick = enterpriseClick;
fastAdd.onclick = fastAddClick;
