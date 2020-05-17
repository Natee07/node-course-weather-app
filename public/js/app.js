console.log("client side javascript!")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
        } else{
            console.log(data)
            messageOne.textContent = data.forecast
            console.log(data.forecast)
        }
        
    })
})
})