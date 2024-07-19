function renderizarProductos(contenedor, productos, limite) {
    let contenedorHtml = '';
    if (productos) {
        productos.slice(0, limite).forEach((producto) => {
            const { img, nombre, desc, duracion } = producto;
            contenedorHtml += `
                <div class="product">
                    <img src="${img}" alt="" class="product-img">
                    <div class="container">
                        <div class="title-container">
                            <h3>${nombre}</h3>
                        </div>
                        <div class="hover-container">
                            <p>${desc}</p>
                            <div class="product-reserva">
                                <p>Duracion: ${duracion} minutos</p>
                                <div class="quantity-container">
                                    <span>Cantidad</span>
                                    <input type="number">
                                </div>
                                <button class="button-reserva" id="id-botonReserva">Reservar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    contenedor.innerHTML = contenedorHtml;
}

async function cargarJson(ruta) {
    try {
        const res = await fetch(ruta);
        const datosJSON = await res.json();
        return datosJSON;
    } catch (error) {
        console.error('Error cargando el JSON:', error);
        throw error;
    }
}

export { renderizarProductos, cargarJson };
