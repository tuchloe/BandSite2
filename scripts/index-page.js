const api = new BandSiteApi('0e2a70e0-7036-4aea-a5e1-ff0bc540dee5');
const commentsSection = document.getElementById('comments');

function displayComment(name, text) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = name;

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = text;

    newComment.appendChild(nameDiv);
    newComment.appendChild(textDiv);

    commentsSection.insertBefore(newComment, commentsSection.firstChild);
}

async function loadComments() {
    try {
        const comments = await api.getComments();
        const recentComments = comments.slice(0, 3);
        recentComments.forEach(comment => displayComment(comment.name, comment.comment));
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

const addCommentBtn = document.getElementById('addCommentBtn');
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');

addCommentBtn.addEventListener('click', async function () {
    const nameText = nameInput.value;
    const commentText = commentInput.value;

    if (nameText.trim() !== "" && commentText.trim() !== "") {
        try {
            await api.postComment({ name: nameText, comment: commentText });
            displayComment(nameText, commentText);
            nameInput.value = '';
            commentInput.value = '';
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    } else {
        alert("Please enter both a name and a comment.");
    }
});

window.onload = function () {
    loadComments();
};
