const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    //validar
    const provincia = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (provincia === '' || pais === '') {
        mostrarError('ambos campos son obligatorios');
    }
    //consultar api

    consultarApi(provincia, pais);

}

function consultarApi(provincia, pais) {
    const Appid = '66da83dd85f00562570f4fb4f68559b5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${provincia},${pais}&appid=${Appid}`;

    spinner();


    fetch(url)
        .then(respuesta => {

            return respuesta.json();
        })
        .then(datos => {
            limpiarHtml();
            if (datos.code === '404') {
                mostrarError('su ciudad no fue encontrada')
                return;
            }

            //imprime la respuesta en el html
            mostrarClima(datos);
        })

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinAcentigrados(temp);
    const minimo = kelvinAcentigrados(temp_min);
    const maximo = kelvinAcentigrados(temp_max);


    const nombre = document.createElement('p');
    nombre.innerHTML = `${name} `;
    nombre.classList.add('text-2xl', 'font-bold')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`; // entidad de html 5 celcius
    actual.classList.add('font-bold', 'text-6xl'); //6xl  definir tamaño de las fuentes en tailwind

    const max = document.createElement('p');
    max.innerHTML = `Max:${maximo} &#8451`
    max.classList.add('text-xl')

    const min = document.createElement('p');
    min.innerHTML = `Min:${minimo} &#8451`
    min.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultado.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);

    resultado.appendChild(resultadoDiv);
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function kelvinAcentigrados(grados) {
    return parseInt(grados - 273.15);
}

function mostrarError(msj) {
    const div = document.querySelector('.bg-red-100');
    if (!div) {
        const div = document.createElement('div');
        div.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-4', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        div.innerHTML = `
        <strong class="font-bold"> Error!</strong>
        <span class="block"> ${msj}</span>
        `
        contenedor.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);

    }





}

function spinner() {
    limpiarHtml();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);


}