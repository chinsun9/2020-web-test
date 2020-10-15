function noticeDel() {
  const flag = confirm(`삭제하시곘습니까?`);

  // 아니오
  if (!flag) {
    return;
  }

  // 네

  document.writeForm.method = 'post';
  document.writeForm.action = '/notice/delete';
  document.writeForm.submit();

  return;
}

function noticeEdit() {
  // 네

  const noticeInfo = JSON.parse(document.getElementById('notice').value);

  location.href = `/notice/edit?idx=${noticeInfo.idx}`;

  return;
}
