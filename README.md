# 2020-web-test

- 도커라이징 하였습니다.
- 기존 프로젝트는 [마스터 브랜치](https://github.com/chinsun9/2020-web-test)를 확인해주세요.
  <br>

- 회원가입, 로그인, 게시판, 페이지네이션, 게시글 정보 api 제공하는 웹서버를 만들어보았습니다.
- nodejs express, ejs로 만들었습니다.
- 로컬 작업시 db는 mariadb를 사용했습니다.
- aws ec2에 올려서 사용할때는 rds로 연결하도록 했습니다.
- 웹화면의 경우 [SB Admin](https://startbootstrap.com/templates/sb-admin/) 부트스트랩을 템플릿을 받아서 수정하였습니다.

<br><br><br>

## 데모 동영상

[![시연영상](https://img.youtube.com/vi/VPq9A_xo2uA/0.jpg)](https://www.youtube.com/watch?v=VPq9A_xo2uA)

<br><br><br>

### ERD

<img src="readmeRes/erd.png">

<br><br><br>

### 디렉터리 구조

    .
    ├── node_modules/
    ├── web
    │   ├── bin
    │   │   └── www
    │   ├── public
    │   │   ├── css
    │   │   │   ├── login.css
    │   │   │   ├── notice-write.css
    │   │   │   ├── notice.css
    │   │   │   ├── plugins.css
    │   │   │   ├── register.css
    │   │   │   └── sb-admin-2.min.css
    │   │   ├── js
    │   │   │   ├── juso-api.js
    │   │   │   ├── login.js
    │   │   │   ├── notice-detail.js
    │   │   │   ├── notice-edit.js
    │   │   │   ├── notice-write.js
    │   │   │   └── register.js
    │   │   └── vendor/
    │   ├── routes
    │   │   ├── api.js
    │   │   ├── index.js
    │   │   ├── login.js
    │   │   ├── logout.js
    │   │   ├── notice.js
    │   │   ├── register.js
    │   ├── utils
    │   │   ├── chk-session.js
    │   │   ├── error-message.js
    │   │   ├── error.js
    │   │   ├── myDAO.js
    │   │   ├── mysql.js
    │   │   └── secret.js
    │   ├── views
    │   │   ├── inc
    │   │   │   ├── footer.ejs
    │   │   │   └── sidebar.ejs
    │   │   ├── error-page.ejs
    │   │   ├── error.ejs
    │   │   ├── juso-api.ejs
    │   │   ├── login.ejs
    │   │   ├── notice-detail.ejs
    │   │   ├── notice-edit.ejs
    │   │   ├── notice-write.ejs
    │   │   ├── notice.ejs
    │   │   └── register.ejs
    │   └── app.js
    ├── .gitattributes
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── sqldump.sql

<br><br><br>

### 도커로 돌려보기

- [다운받기](https://github.com/chinsun9/2020-web-test/archive/master.zip)

```cmd cmd
docker-compose up
```

- localhost:3000

### Node.js 웹 앱 도커라이징

- https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/

<br><br><br>

### 버그

- 이름 유효성 검사 없음
- 비밀번호 대소문자 구분 없음

<br><br><br>

<hr>
<hr>

<br><br><br>

### 도로명 주소 api 신청방법

https://www.juso.go.kr/addrlink/devAddrLinkRequestWrite.do?returnFn=write&cntcMenu=URL

- 딱히 기업에 들어가 있지 않아도 발급 받을 수 있다.
- 서비스 용도를 개발로 고르면 7, 30, 90일 선택하여 발급받을 수 있다.
- 이때 발급받은 키는 다시 확인이 불가하니 꼭 메모한다.

<br><br><br>

### express-generator

- express 템플릿.
- express 프로젝트를 시작할때 디렉터리 구조를 잡아줌
- 하는 방법

  - express-generator 패키지 전역 설치`npm install express-generator -g`
  - express 프로젝트 생성 `express --view=ejs myExpressApp`
  - 아래와 같은 프로젝트가 만들어 진다.
    ```
        root
        ├── bin
        │ └── www
        ├── public
        │ ├── images
        │ ├── javascripts
        │ └── stylesheets
        │ └── style.css
        ├── routes
        │ ├── index.js
        │ └── users.js
        ├── views
        │ ├── error.ejs
        │ └── index.ejs
        ├── app.js
        └── package.json
    ```
  - 열심히 편집한다.

<br><br><br>
