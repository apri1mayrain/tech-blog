// Send POST response info to create new post
const createPostFormHandler = async (event) => {
    event.preventDefault();

    const myPostsEl = document.querySelector('.my-posts');
    const createPostEl = document.querySelector('.create-post-form');
    // Hide my posts element
    myPostsEl.classList.toggle('u-none');
    // Show create post element
    createPostEl.classList.toggle('u-none');

    // Listen for form submission
    document
        .querySelector('.create-post-form')
        .addEventListener('submit', createPostFormHandler);

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    
    // Send POST response to create new post
    if (title && body) {
        const response = await fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If new post was successfully create, reload dashboard
        document.location.replace('/dashboard');
        } else if(response.status === 400) {
        const resMessage = await response.json();
        alert(resMessage.message);
        }
    }
}

document
    .querySelector('#create-post-btn')
    .addEventListener('click', createPostFormHandler);