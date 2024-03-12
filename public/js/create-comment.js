// Send POST request info to create new post
const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const commentsEl = document.querySelector('.comments');
    const createCommentEl = document.querySelector('.create-comment-form');
    // Hide comments element
    commentsEl.classList.toggle('u-none');
    // Show create comment element
    createCommentEl.classList.toggle('u-none');

    // Get the post ID for the current page
    const postID = window.location.toString().slice(-1);

    // Listen for form submission
    document
        .querySelector('.create-comment-form')
        .addEventListener('submit', createCommentFormHandler);

    const body = document.querySelector('#comment-body').value.trim();
    
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

document
    .querySelector('#create-comment-btn')
    .addEventListener('click', createCommentFormHandler);