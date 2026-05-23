const qsHeader = document.getElementById("qsHeader");
const quemSomos = document.getElementById("quemSomos");

qsHeader.addEventListener("click", () => {
    quemSomos.classList.toggle("active");
});
