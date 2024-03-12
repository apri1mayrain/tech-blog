const cancelBtn = document.querySelector('#cancel-btn');
const commentsEl = document.querySelector('.comments');
const commentForm = document.querySelector('.create-comment-form');
const commentBtn = document.querySelector('#new-comment-btn');

// Toggle comments and create comment elements
const toggleElements = async (event) => { 
    commentsEl.classList.toggle('u-none');
    commentForm.classList.toggle('u-none');
}

// Send POST request info to create new post
const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#comment-body').value.trim();
    // Get the post ID for the current page
    const postID = window.location.toString().slice(-1);
    
    // Send POST request to create new comment
    if (body) {
        const response = await fetch('/post/comment', {
        method: 'POST',
        body: JSON.stringify({ body, postID }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If new comment was successfully create, reload post page
        document.location.reload();
        } else if(response.status === 400 || 302) {
        const resMessage = await response.json();
        alert(resMessage.message);
        }
    }
}

// Toggle elements when new comment button is clicked
commentBtn.addEventListener('click', toggleElements);

// Toggle elements when cancel button is clicked
cancelBtn.addEventListener('click', toggleElements);

// Listen when new comment form is submitted
commentForm.addEventListener('submit', createCommentFormHandler);