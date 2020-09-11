let socket = io()

// socket.on('countUpdated',(count)=>{
//    console.log('Count is updated',count)
// })

socket.on('message',(str)=>{
    console.log(str)
})

document.getElementById('message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const value = document.querySelector('input').value
    socket.emit('send',value) 
})

// document.getElementById('btn').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increament')
// }) 
socket.on('msg',(val)=>{
    console.log(val)
})