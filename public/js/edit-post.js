// Send DELETE request info to delete post
const deletePostHandler = async (event) => {
    event.preventDefault();

    console.log('CLICK!!')
    // Get the post ID for the current page
    const postID = window.location.toString().split("/").pop();
    
    // Send DELETE post request
    if (postID) {
        const response = await fetch('/post/delete', {
        method: 'DELETE',
        body: JSON.stringify({ postID }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If post was successfully deleted, redirect to updated dashboard
        document.location.replace('/dashboard');
        } else if(response.status === 400) {
        const resMessage = await response.json();
        alert(resMessage.message);
        }
    }
}

// Send PUT request info to edit/update post
const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();

    // Get the post ID for the current page
    const postID = window.location.toString().split("/").pop();
    
    // Send PUT request to edit post

    // Update body only
    if (!title && body) {
        const response = await fetch('/post/update', {
            method: 'PUT',
            body: JSON.stringify({ postID, body }),
            headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
            // If post was successfully updated, reload dashboard
            document.location.replace('/dashboard');
            } else if(response.status === 400) {
            const resMessage = await response.json();
            alert(resMessage.message);
            }
    }

    // Update title only
    if (!body && title) {
        const response = await fetch('/post/update', {
            method: 'PUT',
            body: JSON.stringify({ postID, title }),
            headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
            // If post was successfully updated, reload dashboard
            document.location.replace('/dashboard');
            } else if(response.status === 400) {
            const resMessage = await response.json();
            alert(resMessage.message);
            }
    }

    // Update title and body
    if (title && body) {
        const response = await fetch('/post/update', {
        method: 'PUT',
        body: JSON.stringify({ postID, title, body }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If post was successfully updated, reload dashboard
        document.location.replace('/dashboard');
        } else if(response.status === 400) {
        const resMessage = await response.json();
        alert(resMessage.message);
        }
    }
}

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostFormHandler);

document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePostHandler);