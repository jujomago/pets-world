import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Términos y Condiciones de Servicio
          </h1>
          <p className="text-gray-600 mb-8">
            Última actualización: 6 de Noviembre de 2025
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                1. Introducción
              </h2>
              <p>
                Bienvenido a Mundo Mascotas. Estos Términos y Condiciones de
                Servicio rigen el uso de nuestra aplicación web y servicios
                relacionados. Al acceder o utilizar nuestro servicio, usted
                acepta estar sujeto a estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                2. Cuentas de Usuario
              </h2>
              <p>
                Para acceder a ciertas funciones, debe crear una cuenta. Usted
                es responsable de mantener la confidencialidad de su contraseña
                y de todas las actividades que ocurran en su cuenta. Se
                compromete a notificarnos inmediatamente cualquier uso no
                autorizado de su cuenta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                3. Contenido del Usuario
              </h2>
              <p>
                Usted es el único responsable de la información, fotos y otro
                contenido que publique en relación con mascotas perdidas, en
                adopción o avistamientos. Al publicar contenido, nos otorga una
                licencia mundial, no exclusiva, libre de regalías para usar,
                reproducir y mostrar dicho contenido en relación con el
                servicio.
              </p>
              <p className="mt-2">
                Usted garantiza que tiene todos los derechos necesarios para
                publicar el contenido y que no infringe los derechos de
                terceros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                4. Conducta Prohibida
              </h2>
              <p>Usted se compromete a no utilizar el servicio para:</p>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                <li>Publicar información falsa o engañosa.</li>
                <li>Acosar, abusar o dañar a otra persona.</li>
                <li>
                  Realizar actividades comerciales no autorizadas, como la venta
                  de animales con fines de lucro (que no sea una tarifa de
                  adopción razonable).
                </li>
                <li>Violar cualquier ley o regulación aplicable.</li>
                <li>Publicar contenido que sea ofensivo, obsceno o de odio.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-balance">
                5. Descargos de Responsabilidad sobre Adopción y Mascotas
                Perdidas
              </h2>
              <p className="text-justify">
                Mundo Mascotas es una plataforma para conectar a las personas.
                No participamos en ninguna transacción o acuerdo entre usuarios.
                No investigamos ni verificamos a los usuarios ni la veracidad de
                los listados.
              </p>
              <p className="mt-2 text-justify">
                No nos hacemos responsables de la condición de ninguna mascota,
                ni de las acciones de los usuarios. Le recomendamos que tome
                precauciones razonables al organizar reuniones para adopciones o
                devoluciones de mascotas perdidas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                6. Propiedad Intelectual
              </h2>
              <p>
                El Servicio y su contenido original, características y
                funcionalidad son y seguirán siendo propiedad exclusiva de Mundo
                Mascotas y sus licenciantes. Nuestro nombre y logotipo son
                marcas comerciales nuestras y no pueden ser utilizados sin
                nuestro permiso previo por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                7. Terminación
              </h2>
              <p>
                Podemos suspender o cancelar su cuenta y el acceso al servicio
                de inmediato, sin previo aviso ni responsabilidad, por cualquier
                motivo, incluido el incumplimiento de estos Términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                8. Limitación de Responsabilidad
              </h2>
              <p>
                En la máxima medida permitida por la ley, Mundo Mascotas no será
                responsable de ningún daño indirecto, incidental, especial,
                consecuente o punitivo, o de cualquier pérdida de ganancias o
                ingresos, ya sea incurrida directa o indirectamente, o cualquier
                pérdida de datos, uso, buena voluntad u otras pérdidas
                intangibles, como resultado de su acceso o uso o incapacidad
                para acceder or usar el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                9. Ley Aplicable
              </h2>
              <p>
                Estos Términos se regirán e interpretarán de acuerdo con las
                leyes de Bolivia, sin tener en cuenta sus disposiciones sobre
                conflicto de leyes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                10. Cambios a los Términos
              </h2>
              <p>
                Nos reservamos el derecho, a nuestra sola discreción, de
                modificar or reemplazar estos Términos en cualquier momento. Le
                notificaremos cualquier cambio publicando los nuevos Términos en
                esta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                11. Contáctenos
              </h2>
              <p>
                Si tiene alguna pregunta sobre estos Términos, por favor
                contáctenos en{" "}
                <a
                  href="mailto:jujomago@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  jujomago@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
