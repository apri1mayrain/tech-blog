const cancelBtn = document.querySelector('#cancel-btn');
const createPostBtn = document.querySelector('#create-post-btn');
const createPostForm = document.querySelector('.create-post-form');
const myPostsEl = document.querySelector('.my-posts');

// Toggle my posts element and new post form
const toggleElements = async (event) => { 
    myPostsEl.classList.toggle('u-none');
    createPostForm.classList.toggle('u-none');
}

// Send POST request info to create new post
const createPostFormHandler = async (event) => {
    event.preventDefault();  

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    
    if(!title || !body){
        alert('Please complete the title and body sections to submit a new post.');
        return;
    }

    // Send POST request to create new post
    if (title && body) {
        const response = await fetch('/post', {
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

// Toggle elements when cancel button is clicked
cancelBtn.addEventListener('click', toggleElements);

// Toggle elements when new post button is clicked
createPostBtn.addEventListener('click', toggleElements);

// Listen when new post form is submitted
createPostForm.addEventListener('submit', createPostFormHandler);