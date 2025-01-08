const commentForm = document.getElementById('commentsForm');

const minUserNameLen = 3;
const minCommentLen = minUserNameLen;

const redBorderStyleClass = 'comments__form--error';

const comments = [
    {
        userName: 'Victor Pinto',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, ' + 
        'everything that makes up this majestic work deserves reverence. Let us appreciate' +
        ' this for what it is and what it contains.',
        commentDate: new Date('11/02/2023'),
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
        userName: 'Isaac Tadesse',
        comment: 'I can\'t stop listening. Every time I hear one of their songs - the vocals ' +
        '- it gives me goosebumps. Shivers straight down my spine. What a ' +
        'beautiful expression of creativity. Can\'t get enough.',
        commentDate: new Date('10/20/2023'),
        rendered: false,
    },
];

function submitCommentHandler(event) {
    event.preventDefault();

    const userName = event.target.userName.value;
    const userComment = event.target.comment.value;
    const commentDate = new Date();

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

    comments.push({
        userName: userName,
        comment: userComment,
        commentDate: commentDate,
    });

    renderComments();
}

function renderComments() {
    const commentSection = document.getElementById('commentsSection');

    for (let comment of comments) {
        if (!comment.rendered) {

            comment.rendered = true;
            
            console.log('User Name: ' + comment.userName);
            console.log('User comment: ' + comment.comment);
            console.log('Date: ' + comment.commentDate);
            console.log('\n');
        }
    }
}

commentForm.addEventListener('submit', submitCommentHandler);
renderComments();