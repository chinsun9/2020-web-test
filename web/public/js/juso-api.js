function goJusoPopup() {
  const pop = window.open(
    'register/juso-api',
    'pop',
    'width=570,height=420, scrollbars=yes, resizable=yes'
  );
}

function jusoCallBack(roadAddrPart1, addrDetail) {
  const form = document.registerForm;

  form.company_address1.value = roadAddrPart1;
  form.company_address2.value = addrDetail;
  //   document.form.roadAddrPart1.value = roadAddrPart1;
  //   document.form.roadAddrPart2.value = roadAddrPart2;
  //   document.form.addrDetail.value = addrDetail;
  //   document.form.engAddr.value = engAddr;
  //   document.form.jibunAddr.value = jibunAddr;
  //   document.form.zipNo.value = zipNo;
  //   document.form.admCd.value = admCd;
  //   document.form.rnMgtSn.value = rnMgtSn;
  //   document.form.bdMgtSn.value = bdMgtSn;
  //   document.form.detBdNmList.value = detBdNmList;
  //   /** 2017년 2월 추가제공 **/
  //   document.form.bdNm.value = bdNm;
  //   document.form.bdKdcd.value = bdKdcd;
  //   document.form.siNm.value = siNm;
  //   document.form.sggNm.value = sggNm;
  //   document.form.emdNm.value = emdNm;
  //   document.form.liNm.value = liNm;
  //   document.form.rn.value = rn;
  //   document.form.udrtYn.value = udrtYn;
  //   document.form.buldMnnm.value = buldMnnm;
  //   document.form.buldSlno.value = buldSlno;
  //   document.form.mtYn.value = mtYn;
  //   document.form.lnbrMnnm.value = lnbrMnnm;
  //   document.form.lnbrSlno.value = lnbrSlno;
  //   /** 2017년 3월 추가제공 **/
  //   document.form.emdNo.value = emdNo;
}
