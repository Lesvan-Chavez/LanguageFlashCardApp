// Function to handle login
async function handleLogin(event) { 
    event.preventDefault();

    const usernameElement = document.getElementById('username');
    console.log('usernameElement', usernameElement)
    const username = usernameElement.value
    console.log('username', username)
}