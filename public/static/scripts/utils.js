var ctx_btn = document.getElementById("ctx_btn");
ctx_btn.addEventListener("click", function (e) {
    let ctx_input = document.getElementById("ctx_input");
    e.preventDefault();
    if (ctx_input.value) {
        sessionStorage.setItem("ctx", ctx_input.value);
    }
});