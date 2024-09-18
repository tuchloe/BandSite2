const preloadedComments = [
            { name: 'Irena', text: 'Their music videos are truly iconic' },
            { name: 'Polly', text: 'When will they be coming to Toronto?' },
            { name: 'Jess', text: 'I love this band!' }
        ];
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
        window.onload = function() {
            const recentComments = preloadedComments.slice(-3); // Get the last 3 comments
            recentComments.forEach(comment => {
                displayComment(comment.name, comment.text);
            });
        };
        const addCommentBtn = document.getElementById('addCommentBtn');
        const nameInput = document.getElementById('nameInput');
        const commentInput = document.getElementById('commentInput');

        addCommentBtn.addEventListener('click', function() {
            const nameText = nameInput.value;
            const commentText = commentInput.value;

            if (nameText.trim() !== "" && commentText.trim() !== "") {
                displayComment(nameText, commentText);
                nameInput.value = '';
                commentInput.value = '';
            } else {
                alert("Please enter both a name and a comment.");
            }
        });