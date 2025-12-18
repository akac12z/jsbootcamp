// con esto creamos un componente como si fuera un nuevo HTML tag propio par areutilizarlos -> web components

class DevjobsAvatar extends HTMLElement {
  constructor () {
    super(); // para llamar al constructor de HTMLElement

    this.attachShadow( { mode: 'open' } ); // para crear un shadow DOM (encapsulamiento del componente) para que por ejemplo los estilos no afecten a otros elementos fuera del componente o viceversa
  }

  // aquí van los métodos
  createUrl ( service, username ) {
    return `https://unavatar.io/${ service }/${ username }`;
  }

  render () {
    // en el render podemos recuperar los atributos que tenga el elemento o aquellos que les quieras dar dinámicamente
    const service = this.getAttribute( 'service' ) ?? 'github'; // si no tiene el atributo service, por defecto será github
    const username = this.getAttribute( 'username' ) ?? 'akac12z'; // si no tiene el atributo username, por defecto será akac12z
    const size = this.getAttribute( 'size' ) ?? '40'; // si no tiene el atributo size, por defecto será 32

    const url = this.createUrl( service, username );
    this.shadowRoot.innerHTML = `
      <style>
        img {
        width: ${ size }px;
        height: ${ size }px;
        border-radius: 100%;
      }
    </style>
      <img
        src="${ url }"
        alt="Avatar de c12z"
        class="avatar"
      />
    `;
  }

  connectedCallback () {
    this.render();
  }
}

customElements.define( 'devjobs-avatar', DevjobsAvatar );
// necesita al menos un guión en el nombre para que no choque con los elementos nativos del HTML