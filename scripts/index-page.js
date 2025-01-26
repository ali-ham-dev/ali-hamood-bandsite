const commentForm = document.getElementById('comments-form');

const minUserNameLen = 3;
const minCommentLen = minUserNameLen;

const horizontalLineClass = 'comments__horizontal-line'; 
const commentSectionId = 'comments-section'; 

const redBorderStyleClass = 'comments__form--error';
const commentsCommentClass = 'comments__comment';
const profilePicClass = 'comments__profile';
const commentProfilePicClass = 'comments__profile--comment';
const commentContentClass = 'comments__comment-content';
const commentHeaderClass = 'comments__comment-header';
const commentUserNameClass = 'comments__comment-user-name';
const commentDateClass = 'comments__comment-date';
const commentTextClass = 'comments__text';
const commentsWrapperClass = 'comments-wrapper';


const apiKey = '/?api_key=219a94e9-8539-4d61-984b-d10be092f38d';
const bandSiteApi = new BandSiteApi(apiKey);

let cachedComments = [];

function getFormateDateDeprecated(date) {
    let dateString = '';

    dateString += String(date.getMonth() + 1).padStart(2, '0') + '/';
    dateString += String(date.getDate()).padStart(2, '0') + '/';
    dateString += date.getFullYear();

    return dateString;
}

function createHorizontalLineHTML() {
    const horizontalLine = document.createElement('div');
    horizontalLine.classList.add(horizontalLineClass);
    return horizontalLine;
}

function createCommentHTML(userName, comment, date) {
    const articleEl = document.createElement('article');
    const figureEl = document.createElement('figure');
    const commentContentEl = document.createElement('div');
    const commentHeaderEl = document.createElement('div');
    const commentUserNameEl = document.createElement('h3');
    const commentDateNameEl = document.createElement('time');
    const commentTextEl = document.createElement('p');

    articleEl.classList.add(commentsCommentClass);
    figureEl.classList.add(profilePicClass);
    figureEl.classList.add(commentProfilePicClass);
    commentContentEl.classList.add(commentContentClass);
    commentHeaderEl.classList.add(commentHeaderClass);
    commentUserNameEl.classList.add(commentUserNameClass);
    commentDateNameEl.classList.add(commentDateClass);
    commentTextEl.classList.add(commentTextClass);

    commentUserNameEl.innerText = userName;
    commentDateNameEl.innerText = date.toLocaleDateString();
    commentDateNameEl.setAttribute('datetime', date.toISOString());
    commentTextEl.innerText = comment;

    commentHeaderEl.appendChild(commentUserNameEl);
    commentHeaderEl.appendChild(commentDateNameEl);

    commentContentEl.appendChild(commentHeaderEl);
    commentContentEl.appendChild(commentTextEl);

    articleEl.appendChild(figureEl);
    articleEl.appendChild(commentContentEl);

    return articleEl;
}

function removeAllComments() {
    const commentWrapper = document.getElementById(commentSectionId);
    const commentElements = document.getElementsByClassName(commentsCommentClass);
    const horizontalLineElements = document.getElementsByClassName(horizontalLineClass);
    
    if (commentElements?.length) {
        const total = commentElements.length - 1;
        for (let i = total; 0 <= i; i--) {
            commentWrapper.removeChild(commentElements[i]);
        }
    }
    
    if (horizontalLineElements?.length) {
        const total = horizontalLineElements.length - 1;
        for (let i = total; 0 <= i; i--) {
            commentWrapper.removeChild(horizontalLineElements[i]);
        }

        const firstHorizontalLine = createHorizontalLineHTML();
        commentWrapper.appendChild(firstHorizontalLine);
    }
}

function commentHasBeenDisplayed(comment) {
    for (let cachedComment of cachedComments) {
        if (cachedComment.name == comment.name &&
            cachedComment.timestamp == comment.timestamp &&
            cachedComment.comment == comment.comment) {
            return true;
        }
    }

    return false;
}

async function renderComments() {
    // removeAllComments();

    const commentWrapper = document.getElementById(commentsWrapperClass);
    let comments = await bandSiteApi.getComments();
    comments = comments.reverse();

    for (let comment of comments) {
        if (!commentHasBeenDisplayed(comment)) {
            const htmlComment = createCommentHTML(comment.name, comment.comment, new Date(comment.timestamp));
            commentWrapper.prepend(htmlComment);
            commentWrapper.prepend(createHorizontalLineHTML());
            cachedComments.push(comment);
        }
    }
}

async function submitCommentHandler(event) {
    event.preventDefault();

    const userName = event.target.userName.value;
    const userComment = event.target.comment.value;

    const userNameInput = event.target.userName;
    userNameInput.classList.remove(redBorderStyleClass);
    const commentInput = event.target.comment;
    commentInput.classList.remove(redBorderStyleClass);

    let invalidInput = false;
    let errorMessage = '';

    if (userName.length < minUserNameLen) {
        userNameInput.classList.add(redBorderStyleClass);
        invalidInput = true;
        errorMessage += 'Invalid user name.\n'
    }

    if (userComment < minCommentLen) {
        commentInput.classList.add(redBorderStyleClass);
        invalidInput = true;
        errorMessage += 'Invalid comment.\n'
    }

    if (invalidInput) {
        alert(errorMessage);
        return;
    }

    event.target.comment.value = '';
    event.target.userName.value = '';

    await bandSiteApi.postComment({
        name: userName, 
        comment: userComment
    });

    renderComments();
}

commentForm.addEventListener('submit', submitCommentHandler);
renderComments();