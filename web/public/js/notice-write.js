// notice-edit
function noticeSave() {
  const form = document.writeForm;
  if (form.title.value.length === 0 || form.content.value.length === 0) {
    alert('모든 항목은 필수입력 사항입니다.');
    return;
  }

  form.submit();
}
