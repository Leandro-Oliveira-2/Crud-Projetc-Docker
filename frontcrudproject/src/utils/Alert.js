import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

// color_type (s=success, d=danger, w=warning, i=info)
const Alert = (text = '', color_type = 's', delay = 3000, action = ()=>{}, link = '', new_window = true, close = true, stopOnFocus = true) => {
    let color = '#60BB46'

    if(color_type == 'w'){
        color = '#F58220'
    }

    if(color_type == 'i'){
        color = '#0070C0'
    }
    
    if(color_type == 'd'){
        color = '#EE1D23'
        delay = delay+5000
    }

    Toastify({
        text: text,
        duration: delay,
        destination: link,
        newWindow: new_window,
        close: close,
        className: 'custom-toastfy-alert',
        style: {
            background: color, // Atualização aqui
        },
        stopOnFocus: stopOnFocus,
        onClick: action
    }).showToast()
    
}

export default Alert