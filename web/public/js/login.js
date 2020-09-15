// 로그인 버튼
function chkLogin() {
  const form_value = document.login;
  if (!form_value.uid.value || !form_value.pass.value) {
    alert('아이디/비밀번호를 입력해 주세요');
    return;
  }
}
