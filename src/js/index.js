import { renderizarProductos, cargarJson } from './funciones.js';

const contenedorIndex = document.getElementById('productos-contenedor');
const botonVerMas = document.getElementById('ver-mas');
const categoriaContenedor = document.getElementById('categorias');

let peliculas;
cargarJson('../../json/productos.json')
    .then(datos => {
        peliculas = datos;
        renderizarProductos(contenedorIndex, peliculas.productos, 6);
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });

// Renderizado por categoría
const categoriasLinks = document.querySelectorAll('.categoriaslist-container a');
let filtroAplicado = null;
let verMenosActivado = false;

categoriasLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (peliculas) {
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
        }
    });
});

// Lógica para ver menos y ver más
botonVerMas.addEventListener('click', (e) => {
    e.preventDefault();
    if (peliculas) {
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
    }
});
