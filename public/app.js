document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById('contenedor-refugios');
    const buscador = document.getElementById('buscador');
    let datos = [];

    // 1. Cargar el JSON estático
    try {
        const respuesta = await fetch('./public/datos.json');
        datos = await respuesta.json();
        renderizar(datos);
    } catch (error) {
        contenedor.innerHTML = '<p class="text-red-500 text-center">Error al cargar la información. Intenta recargar la página.</p>';
    }

    // 2. Función para pintar las tarjetas
    function renderizar(lista) {
        contenedor.innerHTML = '';
        if (lista.length === 0) {
            contenedor.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
            return;
        }

        lista.forEach(item => {
            // Lógica de colores para los semáforos
            const colorAgua = item.necesidades.agua === 'critico' ? 'bg-red-500' : (item.necesidades.agua === 'moderado' ? 'bg-yellow-500' : 'bg-green-500');
            const colorComida = item.necesidades.comida === 'critico' ? 'bg-red-500' : (item.necesidades.comida === 'moderado' ? 'bg-yellow-500' : 'bg-green-500');
            const colorMed = item.necesidades.medicinas === 'critico' ? 'bg-red-500' : (item.necesidades.medicinas === 'moderado' ? 'bg-yellow-500' : 'bg-green-500');

            const tarjeta = `
                <div class="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                    <h2 class="text-xl font-bold">${item.nombre}</h2>
                    <p class="text-sm text-gray-600 mb-2">📍 ${item.estado}, ${item.municipio} - ${item.direccion}</p>
                    
                    <div class="flex gap-2 mt-3 text-xs font-bold text-white">
                        <span class="px-2 py-1 rounded ${colorAgua}">Agua</span>
                        <span class="px-2 py-1 rounded ${colorComida}">Comida</span>
                        <span class="px-2 py-1 rounded ${colorMed}">Medicinas</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-3 text-right">Actualizado: ${item.actualizado}</p>
                </div>
            `;
            contenedor.innerHTML += tarjeta;
        });
    }

    // 3. Lógica del buscador en tiempo real
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const filtrados = datos.filter(item => 
            item.estado.toLowerCase().includes(termino) || 
            item.municipio.toLowerCase().includes(termino)
        );
        renderizar(filtrados);
    });
});