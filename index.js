const peliculas = {
    productos: [
        {
            id: 1,
            img: './src/imgs/portada-avengers.jpg',
            nombre: 'Avengers-Endgame',
            desc: 'Los Vengadores se reúnen para derrotar a Thanos.',
            duracion: 180,
            categoria: 'ACCION'
        },
        {
            id: 2,
            img: './src/imgs/portada-it.jpg',
            nombre: 'It',
            desc: 'Un grupo de niños enfrenta sus peores miedos.',
            duracion: 135,
            categoria: 'TERROR'
        },
        {
            id: 3,
            img: './src/imgs/portada-jumanji.jpg',
            nombre: 'Jumanji',
            desc: 'Un grupo de amigos se adentra en un videojuego peligroso.',
            duracion: 119,
            categoria: 'COMEDIA'
        },
        {
            id: 4,
            img: './src/imgs/portada-inception.jpg',
            nombre: 'Inception',
            desc: 'Un ladrón que roba secretos a través de los sueños.',
            duracion: 148,
            categoria: 'SUSPENSO'
        },
        {
            id: 5,
            img: './src/imgs/portada-parasite.jpg',
            nombre: 'Parasite',
            desc: 'Una familia pobre se infiltra en una familia rica.',
            duracion: 132,
            categoria: 'SUSPENSO'
        },
        {
            id: 6,
            img: './src/imgs/portada-john.jpg',
            nombre: 'John Wick',
            desc: 'Un ex-asesino busca venganza por la muerte de su perro.',
            duracion: 101,
            categoria: 'ACCION'
        },
        {
            id: 7,
            img: './src/imgs/portada-conjuro.jpg',
            nombre: 'The Conjuring',
            desc: 'Investigadores paranormales ayudan a una familia aterrorizada.',
            duracion: 112,
            categoria: 'TERROR'
        },
        {
            id: 8,
            img: './src/imgs/portada-superbad.jpg',
            nombre: 'Superbad',
            desc: 'Dos adolescentes intentan conseguir alcohol para una fiesta.',
            duracion: 113,
            categoria: 'COMEDIA'
        },
        {
            id: 9,
            img: './src/imgs/portada-gonegirl.jpg',
            nombre: 'Gone Girl',
            desc: 'Una mujer desaparece y su esposo es el principal sospechoso.',
            duracion: 149,
            categoria: 'SUSPENSO'
        },
        {
            id: 10,
            img: './src/imgs/portada-mad.jpg',
            nombre: 'Mad Max: Fury Road',
            desc: 'En un mundo postapocalíptico, luchan por la supervivencia.',
            duracion: 120,
            categoria: 'ACCION'
        },
        {
            id: 11,
            img: './src/imgs/portada-hereditary.jpg',
            nombre: 'Hereditary',
            desc: 'Una familia es acechada por eventos sobrenaturales.',
            duracion: 127,
            categoria: 'TERROR'
        },
        {
            id: 12,
            img: './src/imgs/portada-hangover.jpg',
            nombre: 'The Hangover',
            desc: 'Tres amigos despiertan sin recordar la noche anterior.',
            duracion: 100,
            categoria: 'COMEDIA'
        },
        {
            id: 13,
            img: './src/imgs/portada-se7en.jpg',
            nombre: 'Se7en',
            desc: 'Dos detectives buscan a un asesino que usa los siete pecados capitales.',
            duracion: 127,
            categoria: 'SUSPENSO'
        }
    ]
};

const contenedorIndex = document.getElementById('productos-contenedor');
const botonVerMas = document.getElementById('ver-mas');
const categoriaContenedor = document.getElementById('categorias');

// Renderizado estándar
function renderizarProductos(contenedor, productos, limite) {
    let contenedorHtml = '';
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
    contenedor.innerHTML = contenedorHtml;
}
renderizarProductos(contenedorIndex, peliculas.productos, 6);

//--------------------------------------------------------------------------------//

// RENDERIZADO POR CATEGORIA
const categoriasLinks = document.querySelectorAll('.categoriaslist-container a');
let filtroAplicado = null;

categoriasLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoria = link.getAttribute('data-categoria');

        if (filtroAplicado === categoria) {
            renderizarProductos(contenedorIndex, peliculas.productos, 6);
            link.classList.remove('active');
            filtroAplicado = null;
            botonVerMas.classList.remove('hidden');
            verMenosActivado = false;
            botonVerMas.innerHTML = 'Ver más';
        } else {
            const peliculasCategoria = peliculas.productos.filter((producto) => {
                return producto.categoria === categoria;
            });
            renderizarProductos(contenedorIndex, peliculasCategoria, 12);
            categoriasLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
            filtroAplicado = categoria;
            botonVerMas.classList.add('hidden');
            verMenosActivado = false;
            botonVerMas.innerHTML = 'Ver más';
        }
    });
});

//---------------------------------------------------------------------------------//
// Lógica para ver menos y ver más
botonVerMas.addEventListener('click', (e) => {
    e.preventDefault();
    if (!verMenosActivado) {
        renderizarProductos(contenedorIndex, peliculas.productos, 12);
        botonVerMas.innerHTML = 'Ver menos';
        verMenosActivado = true;
    } else {
        renderizarProductos(contenedorIndex, peliculas.productos, 6);
        botonVerMas.innerHTML = 'Ver más';
        categoriaContenedor.scrollIntoView({ behavior: 'smooth' });
        verMenosActivado = false;
    }
});

