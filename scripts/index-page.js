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

const commentsLikeButtonClass = 'comments__like-button';
const commentsDeleteButtonClass = 'comments__delete-button';
const commentControlsClass = 'comments__comment-controls';


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

function createHorizontalLineHTML(comment) {
    const horizontalLine = document.createElement('div');
    horizontalLine.id = comment.id;
    horizontalLine.classList.add(horizontalLineClass);
    return horizontalLine;
}

async function updateLikes(event) {
    event.preventDefault();

    await bandSiteApi.likeComment(event.target.id);

    const comments = await bandSiteApi.getComments();
    const comment = comments.find((comment) => {
        if (comment.id == event.target.id) {
            return comment;
        }
    });

    event.target.innerText = comment.likes;
    event.target.style.width = 2.5 + (comment.likes.toString().length - 1) * 0.5 + 'rem';
}

function createLikeButton(comment) {
    const commentLikeButtonEL = document.createElement('button');
    commentLikeButtonEL.classList.add(commentsLikeButtonClass);
    commentLikeButtonEL.addEventListener('click', updateLikes);
    commentLikeButtonEL.innerText = comment.likes;
    commentLikeButtonEL.id = comment.id;
    commentLikeButtonEL.style.width = 2.5 + (comment.likes.toString().length - 1) * 0.5 + 'rem';

    return commentLikeButtonEL;
}

async function deleteComment(event) {
    event.preventDefault();

    if (!confirm('Are you sure you want to delete the comment?')) {
        return;
    }

    await bandSiteApi.deleteComment(event.target.id);

    const commentIndex = cachedComments.findIndex((comment) => {
        if (comment.id == event.target.id) {
            return true;
        }
        return false;
    });
    cachedComments.splice(commentIndex, 1);

    let commentOrLine = document.getElementById(event.target.id);
    while(commentOrLine) {
        commentOrLine.remove();
        commentOrLine = document.getElementById(event.target.id);
    }
}

function createDeleteButton(comment) {
    const commentDeleteButtonEL = document.createElement('button');
    commentDeleteButtonEL.classList.add(commentsDeleteButtonClass);
    commentDeleteButtonEL.addEventListener('click', deleteComment);
    commentDeleteButtonEL.id = comment.id;

    return commentDeleteButtonEL;
}

function createCommentHTML(comment) {
    const articleEl = document.createElement('article');
    const figureEl = document.createElement('figure');
    const commentContentEl = document.createElement('div'); 
    const commentHeaderEl = document.createElement('div');
    const commentControlsEl = document.createElement('div');
    const commentUserNameEl = document.createElement('h3');
    const commentDateNameEl = document.createElement('time');
    const commentTextEl = document.createElement('p');

    articleEl.classList.add(commentsCommentClass);
    figureEl.classList.add(profilePicClass);
    figureEl.classList.add(commentProfilePicClass);
    commentContentEl.classList.add(commentContentClass);
    commentHeaderEl.classList.add(commentHeaderClass);
    commentControlsEl.classList.add(commentControlsClass);
    commentUserNameEl.classList.add(commentUserNameClass);
    commentDateNameEl.classList.add(commentDateClass);
    commentTextEl.classList.add(commentTextClass);

    commentUserNameEl.innerText = comment.name;
    const date = new Date(comment.timestamp);
    commentDateNameEl.innerText = date.toLocaleDateString();
    commentDateNameEl.setAttribute('datetime', date.toISOString());
    commentTextEl.innerText = comment.comment;

    commentHeaderEl.appendChild(commentUserNameEl);
    commentHeaderEl.appendChild(commentDateNameEl);

    commentControlsEl.appendChild(createLikeButton(comment));
    commentControlsEl.appendChild(createDeleteButton(comment));

    commentContentEl.appendChild(commentHeaderEl);
    commentContentEl.appendChild(commentTextEl);
    commentContentEl.appendChild(commentControlsEl);

    articleEl.id = comment.id;
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
        if (cachedComment.id == comment.id) {
            return true;
        }
    }

    return false;
}

async function renderComments() {
    const commentWrapper = document.getElementById(commentsWrapperClass);
    let comments = await bandSiteApi.getComments();
    comments = comments.reverse();

    for (let comment of comments) {
        if (!commentHasBeenDisplayed(comment)) {
            const htmlComment = createCommentHTML(comment);
            commentWrapper.prepend(htmlComment);
            commentWrapper.prepend(createHorizontalLineHTML(comment));
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