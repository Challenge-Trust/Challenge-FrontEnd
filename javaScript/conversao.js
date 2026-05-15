const inputCreditos = document.getElementById("inputCreditos");
const valorReais = document.getElementById("valorReais");

inputCreditos.addEventListener("input", () => {
    inputCreditos.value = inputCreditos.value.replace(/\D/g, "");

    const valor = Number(inputCreditos.value) || 0;
    const convertido = valor / 10;

    valorReais.textContent = `R$${convertido.toFixed(2)}`;
});