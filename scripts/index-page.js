const commentForm = document.getElementById('comments-form');

const minUserNameLen = 3;
const minCommentLen = minUserNameLen;

const horizontalLineClass = 'comments__horizontal-line'; 
const commentSectionId = 'comments-section'; 

const redBorderStyleClass = 'comments__form--error';
const commentWrapperClass = 'comments__comment';
const profilePicClass = 'comments__profile';
const commentProfilePicClass = 'comments__profile--comment';
const commentContentClass = 'comments__comment-content';
const commentHeaderClass = 'comments__comment-header';
const commentUserNameClass = 'comments__comment-user-name';
const commentDateClass = 'comments__comment-date';
const commentTextClass = 'comments__text';

const apiKey = '/?api_key=219a94e9-8539-4d61-984b-d10be092f38d';
const bandSiteApi = new BandSiteApi(apiKey);

const comments = [
    {
        userName: 'Isaac Tadesse',
        comment: 'I can\'t stop listening. Every time I hear one of their songs - the vocals ' +
        '- it gives me goosebumps. Shivers straight down my spine. What a ' +
        'beautiful expression of creativity. Can\'t get enough.',
        commentDate: new Date('10/20/2023'),
        rendered: false,
    },

    {
        userName: 'Christina Cabrera',
        comment: 'I feel blessed to have seen them in person. What a show! They were ' +
        'just perfection. If there was one day of my life I could relive, this ' +
        'would be it. What an incredible day.',
        commentDate: new Date('10/28/2023'),
        rendered: false,
    },

    {
        userName: 'Victor Pinto',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, ' + 
        'everything that makes up this majestic work deserves reverence. Let us appreciate' +
        ' this for what it is and what it contains.',
        commentDate: new Date('11/02/2023'),
        rendered: false,
    },
];

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

    articleEl.classList.add(commentWrapperClass);
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
    const commentElements = document.getElementsByClassName(commentWrapperClass);
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

async function renderComments() {
    removeAllComments();

    const commentWrapper = document.getElementById(commentSectionId);
    const comments = await bandSiteApi.getComments();

    for (let comment of comments) {
        const htmlComment = createCommentHTML(comment.name, comment.comment, new Date(comment.timestamp));
        commentWrapper.appendChild(htmlComment);
        commentWrapper.appendChild(createHorizontalLineHTML());
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