// notice-edit
function noticeSave() {
  const form = document.writeForm;
  if (form.title.value.length === 0 || form.content.value.length === 0) {
    alert('모든 항목은 필수입력 사항입니다.');
    console.log(item);
    item.focus();
    return;
  }

  // 입력값을 변수에 담고 문자열 형태로 변환
  //   data = JSON.stringify(data);

  let data = objectifyForm($(form).serializeArray());
  console.log(data);

  // content-type을 설정하고 데이터 송신
  let xhr = new XMLHttpRequest();
  xhr.open('post', `/notice/edit`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(data));

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function () {
    let result = JSON.parse(xhr.responseText);
    // 데이터가 없으면 return 반환
    console.log(result);

    if (result.result === 'ok') {
      alert('공지사항이 수정되었습니다.');
    } else if (result.result === 'fail') {
      alert(result.message);
      location.href = result.url;
    }
  });
}

function objectifyForm(formArray) {
  //serialize data function
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}
