// ## Funcionalidades

// - Al cargar el DOM, la aplicación tiene que llamar una función que realiza una solicitud a la API para obtener información sobre todos los países. Son 250, tarda un poco en renderizar.
// - La información se ordena alfabéticamente.
// - Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una ventana flotante del país seleccionado. La Muestra información detallada sobre el país seleccionado, incluyendo la bandera, la capital, la población, el lado de la carretera por el que se circula.
// - Tendrá un botón cerrar para hacer desaparecer esa información.

// Tendrá este aspecto
// ![banderas](./img/banderas-1.png)

// ![banderas](./img/banderas-2.png)

// ## API utilizada

// Esta aplicación utiliza la API de REST Countries para obtener información sobre los países. La URL de la API es [https://restcountries.com/v3/all](https://restcountries.com/v3/all).


// ## Notas y pistas

// - Los paises se ordenarán en orden alfabético (recuerda el método `sort`). Recuerda que para ordenar no es lo mismo mayúsculas que minúsculas. Si comparas que sea lo mismo... pasa los nombres a mayúsculas si te parece más sencillo para la comparación.
// - La información detallada incluye la bandera del país, la capital, la población y el lado de la carretera donde se circula. Este flotante se quedará fijo y centrado hasta que se cierre.
// - La aplicación está diseñada con un enfoque simple y utiliza funciones asíncronas para manejar las solicitudes a la API. Recuerda que podrás usar fetch, Async/Await...
// - Puedes manipular el `HTML` si lo necesitaras. 
// - Si necesitas añadir clases a un elemento mediante JS, lo puedes hacer con `elemento.classList.add('clase que quieres añadir')` y para eliminar `elemento.classList.remove('clase que quieres añadir')`

const fetchFlags = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all')
        if (!response.ok) {
            throw new Error ('Error', response.status)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error al obtener datos', error)
    }
}

const renderItems = (data) => {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common)); //la funcion localeCompare() compara segun las reglas de la region actual en este caso el alfabeto estandar

    data.forEach(element => {
        const template = document.createElement('div')
        template.classList.add('template')

        const img = document.createElement('img')
        img.src = element.flags[0]
        img.alt = element.name.common
        template.appendChild(img)

        const flagName = document.createElement('h2')
        flagName.textContent = element.name.common
        template.appendChild(flagName)

        const countriesList = document.getElementById('countries-list')
        countriesList.appendChild(template)
    });
}

fetchFlags().then((data) => renderItems(data))