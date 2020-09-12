let socket = io()

const msgfrm = document.getElementById('message-form')
const msginp = document.querySelector('input')
const msgbtn = document.querySelector('button')
const geobtn = document.getElementById('geo')
const msgdiv = document.getElementById('messages')
// socket.on('countUpdated',(count)=>{
//    console.log('Count is updated',count)
// })
//templates
const temp = document.getElementById('msg-template').innerHTML

socket.on('message',(str)=>{
    console.log(str)
    const html = Mustache.render(temp,{
        message
    })
    msgdiv.insertAdjacentHTML('beforeend',html)
})

msgfrm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msgbtn.setAttribute('disabled','disabled')
    const value = msginp.value
    socket.emit('send',value,(err)=>{
        msgbtn.removeAttribute('disabled')
        msginp.value = ''
        msginp.focus()
        if(err){
            return console.log(err)
        }
        console.log('The message was delivered')
    }) 
})

// document.getElementById('btn').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increament')
// }) 
socket.on('msg',(val)=>{
    console.log(val)
})

geobtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported')
    }
    geobtn.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((pos)=>{
         socket.emit('sendLocation',{lat:pos.coords.latitude,lon:pos.coords.longitude},(msg)=>{
             geobtn.removeAttribute('disabled')
             console.log(msg)
         })
    })
})