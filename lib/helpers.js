export async function bodyOverlay() {
    document.body.classList.toggle('on')
}

export async function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}