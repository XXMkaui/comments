const formBtn = document.getElementById('form__btn');
const userName = document.getElementsByClassName('user-name')[0];
const userComment = document.getElementsByClassName('user-comment')[0];
const userDate = document.getElementById('user-date');
const commentsField = document.getElementById('comments');
let commentsImg = document.getElementsByClassName('comments__like-img');
let commentsRemove = document.getElementsByClassName('comment__remove');
commentsImgArr = [...commentsImg];
commentsRemoveArr = [...commentsRemove];


formBtn.addEventListener('click', sendComment);

function sendComment(e) {
  e.preventDefault()

  const name = userName.value;
  const comment = userComment.value;
  let date = userDate.value;
  // console.log(date)

  if (!isValidate) {
    userName.classList.add('input-invalid');

    if (document.getElementsByClassName('invalid-msg').length < 1) {
      const miss = document.createElement('div');
      miss.innerHTML = `<h2>Минимальная длина имени - 5 символов</h2>`
      document.getElementsByClassName('user-name')[0].insertAdjacentElement('afterend', miss)
      miss.classList = 'invalid-msg';
    }

  }
  if (!isValidateComment) {
    userComment.classList.add('input-invalid');

    if (document.getElementsByClassName('invalid-text').length < 1) {
      const badText = document.createElement('div');
      badText.innerHTML = `<h2>Минимальная длина комментария - 10 символов</h2>`
      document.getElementsByClassName('user-comment')[0].insertAdjacentElement('afterend', badText)
      badText.classList = 'invalid-text';
    }
  } 
  if (isValidate && isValidateComment) {
    let cur = new Date();
    let curYear = cur.getFullYear();
    let curMonth = cur.getMonth() + 1;
    if (curMonth < 10) curMonth = '0' + curMonth;
    let curDay = cur.getDate();
    if (curDay < 10) curDay = '0' + curDay;
    let fullCur = curYear + '-' + curMonth + '-' + curDay;

    if (date == '' || date == fullCur) {
      const now = new Date();
      let hours = now.getHours();
      if (hours < 10) hours = '0' + hours
      let minutes = now.getMinutes();
      if (minutes < 10) minutes = '0' + minutes
      date = 'сегодня, ' + hours + ':' + minutes;
    } else if (new Date(fullCur) - new Date(date) >= 0 && new Date(fullCur) - new Date(date) <= 86400000) {
      date = 'вчера, 18:39';
    }

    let firstLetter = name[0];

    userName.value = '';
    userComment.value = '';
    userDate.value = '';

    const block = document.createElement('div');
    block.classList = 'comments__item';
    block.innerHTML = `
    <div class="comments__img"><p>${firstLetter}</p></div>
    <div class="comments__info">
      <div class="comments__info-top">
        <div class="comments__name">${name}</div>
        <div class="comments__date">${date}</div>
        <div class="comment__remove">x</div>
      </div>
      <div class="comments__text"><p>${comment}</p></div>
      <div class="comments__like-img">
        <svg id="comments_heart" fill="currentColor" width="15px" height="15px" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
        d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
        </svg>
      </div>
    </div>
    `;

    const parent = document.querySelector('.comments')
    parent.insertAdjacentElement('beforeend', block);

    commentsImgArr = [...commentsImg];
    commentsRemoveArr = [...commentsRemove];

    commentsImgArr.forEach((item, index, arr) => {
      if (index >= arr.length - 1) {
        item.addEventListener("click", function () {
          if (item.firstElementChild.classList == '') item.firstElementChild.classList.add('comments_heart-click')
          else item.firstElementChild.classList.remove('comments_heart-click')
        });
      }
    });

    commentsRemoveArr.forEach((item, index, arr) => {
      if (index >= arr.length - 1) {
        item.addEventListener("click", function () {
          console.log(item)
          item.parentElement.parentElement.parentElement.style.display = 'none';
        });
      }
    });
  }

  if (isValidate && comment != '' && isValidateComment) { isValidate = false; isValidateComment = false } 
}

isValidate = false;
isValidateComment = false;

function validation() {
  if (userName.value.length < 5) {
    userName.classList.add('input-invalid');

    if (document.getElementsByClassName('invalid-msg').length < 1) {
      const miss = document.createElement('div');
      miss.innerHTML = `<h2>Минимальная длина имени - 5 символов</h2>`
      document.getElementsByClassName('user-name')[0].insertAdjacentElement('afterend', miss)
      miss.classList = 'invalid-msg';

      isValidate = false;
    }
  } else {
    userName.classList.remove('input-invalid');

    if (document.getElementsByClassName('invalid-msg').length > 0) document.getElementsByClassName('invalid-msg')[0].remove();

    isValidate = true;
  }
}

function validationText() {
  if (userComment.value.length < 10) {
    userComment.classList.add('input-invalid');

    if (document.getElementsByClassName('invalid-text').length < 1) {
      const badText = document.createElement('div');
      badText.innerHTML = `<h2>Минимальная длина комментария - 10 символов</h2>`
      document.getElementsByClassName('user-comment')[0].insertAdjacentElement('afterend', badText)
      badText.classList = 'invalid-text';

      isValidateComment = false;
    }
  } else {
    userComment.classList.remove('input-invalid');

    if (document.getElementsByClassName('invalid-text').length > 0) document.getElementsByClassName('invalid-text')[0].remove();

    isValidateComment = true;
  }
}
