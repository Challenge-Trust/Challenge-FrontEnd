const form = document.querySelector("#formulario")
const modal = document.querySelector("#modalMensagemEnviada")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    modal.showModal()

    form.reset()
})