`use strict`;
let form = document.registerForm;
let checkedID = false;

function chkID() {
  // 아이디 문자열 유효성 검사
  var idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  if (!idRegExp.test(form.uid.value)) {
    alert('아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.');
    return;
  }

  return true;
}

function chkName() {
  // 이름 문자열 유효성 검사
  var idRegExp = /^[가-힣0-9]|[a-zA-Z0-9]$/;

  if (form.user_name.value.length > 30 || form.user_name.value.length <= 2) {
    alert('이름은 3자 이상 30자 미만으로 해주세요.');
    return;
  }

  if (!idRegExp.test(form.user_name.value)) {
    alert(
      '이름은 영문, 한글, 숫자만 가능합니다. 한글은 2 ~ 14글자, 영문은 (2 ~ 30글자)로 입력해 주세요.'
    );
    form.user_name.focus();
    return;
  }

  return true;
}

function chkDupe() {
  if (!form.uid.value) {
    alert(`ID를 먼저 입력해주세요.`);
    return;
  }
  if (!chkID()) {
    return;
  }
  //   let tmp = document.registerForm.elements;

  //   for (let item of tmp) {
  //     console.log(item);
  //   }

  const uid = form.uid.value;

  // 입력값을 변수에 담고 문자열 형태로 변환
  //   data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `register/chkID?uid=${uid}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send();

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function () {
    let result = JSON.parse(xhr.responseText);
    // 데이터가 없으면 return 반환
    console.log(result);

    if (result === 'ok') {
      alert('사용가능한 ID입니다.');
      checkedID = true;
      document.getElementById('chkuid').classList.add('chk-successful');
    } else {
      alert('이미 존재하는 ID입니다.');
      form.uid.value = '';
      document.getElementById('chkuid').classList.remove('chk-successful');
    }
  });
}

function chkAgree() {
  console.log(form.agree);
  return form.agree.checked;
}

function chkPass() {
  // 비밀번호는 공백을 제외한 영문, 숫자, 특수문자 조합으로 8자리 이상 20자리 이하
  const pass = form.pass.value;
  console.log(pass);

  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;
  const pattern3 = /[~!@\#$%<>^&*]/; // 원하는 특수문자 추가 제거

  if (
    pass.length < 8 ||
    pass.length > 20 ||
    !pattern1.test(pass) ||
    !pattern2.test(pass) ||
    !pattern3.test(pass)
  ) {
    // console.log('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
    document.getElementById('chkpass').classList.remove('chk-successful');
    return false;
  }

  document.getElementById('chkpass').classList.add('chk-successful');
  return true;
}

function chkPassPair() {
  if (!chkPass()) {
    return false;
  }
  const pass = form.pass.value;
  const pass2 = form.pass2.value;

  if (pass !== pass2) {
    // console.log('비밀번호가 일치하지 않습니다.');
    document.getElementById('chkpass2').classList.remove('chk-successful');
    return false;
  }

  document.getElementById('chkpass2').classList.add('chk-successful');
  return true;
}

function chkEmail() {
  const x = form.user_mail.value;
  const atpos = x.indexOf('@');
  const dotpos = x.lastIndexOf('.');
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
    return false;
  }
  return true;
}

function registerFormSumbit() {
  // 약관 체크 확인
  if (!chkAgree()) {
    alert(`약관에 동의해 주세요.`);
    return;
  }

  // 아이디 중복 확인
  if (!checkedID) {
    alert(`아이디 중복체크를 해주세요.`);
    return;
  }

  // 비밀번호 생성규칙 확인
  // 비밀번호는 공백을 제외한 영문, 숫자, 특수문자 조합으로 8자리 이상 20자리 이하
  if (!chkPass()) {
    alert(`사용가능한 비밀번호가 아닙니다.`);
    return;
  }

  if (!chkPassPair()) {
    alert(`동일한 비밀번호를 입력해 주세요.`);
    return;
  }

  // 빈 필드 확인
  console.log('----------');
  for (let item of form) {
    if (item.value.length === 0) {
      alert('모든 항목을 작성해주세요');
      console.log(item);
      item.focus();
      return;
    }
  }

  // 이메일 체크

  if (!chkEmail()) {
    alert('이메일을 완성해주세요.');
    form.user_mail.focus();
    return;
  }

  // 회원가입 전송

  let xhr = new XMLHttpRequest();
  // let data = new FormData(form); // 폼데이터는 서버에서 멀티파트로 읽어야한다고 한다.
  let data = $('form[name="registerForm"]').serialize();
  console.log(data);

  xhr.open('POST', `register`);
  // xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function () {
    let result = JSON.parse(xhr.responseText);
    console.log(result);
    alert(result.message);

    if (result.result == 'ok') {
      location.href = result.nexturl;
    }

    // 데이터가 없으면 return 반환
  });
}

form['uid'].addEventListener('change', function () {
  chkID();
  checkedID = false;
  document.getElementById('chkuid').classList.remove('chk-successful');
});

form['pass'].addEventListener('change', function () {
  console.log(`chkPass()`, chkPass());
  console.log(`chkPassPair()`, chkPassPair());
});

form['pass2'].addEventListener('change', function () {
  console.log(`chkPassPair()`, chkPassPair());
});

form['user_name'].addEventListener('change', function () {
  console.log(`chkName()`, chkName());
});
