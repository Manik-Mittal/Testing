let form = document.getElementById('lobby__form')

let displayName = sessionStorage.getItem('display_name')
if (displayName) {
    form.name.value = displayName
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let user = {
        email: ""
    }
    user.email = e.target.email.value;
    console.log(user.email)
    sessionStorage.setItem('display_name', e.target.name.value)

    let inviteCode = e.target.room;
    if (!inviteCode) {

        const usersinlive = async () => {
            await fetch('https://skypeshop.onrender.com/searchuserinlive', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch users from userinlive collection")
                }
                return response.json()
            }).then((data) => {
                console.log(data.users[0].room)
                inviteCode = data.users[0].room
                if (!inviteCode) {
                    alert('Incorrect Email id')
                    window.location = "/"
                }
            }).catch((err) => {
                alert('Incorrect Email id')
                window.location = "/"
                console.log(err)
            })

            await fetch('https://skypeshop.onrender.com/deleteuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to delete")
                }
                return response.json()
            }).then((data) => {
                console.log(data)
                console.log(inviteCode)
                // setTimeout(() => {
                //     window.location = `room.html?room=${inviteCode}`
                // }, 3000);
            }).catch((err) => {
                console.log(err)
            })

        }
        usersinlive()
    }
    else {
        window.location = `room.html?room=${inviteCode.value}`
    }

})
