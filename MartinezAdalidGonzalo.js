class Usuario {
  constructor (nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }
  getFullName () {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota (mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas () {
    return this.mascotas.length;
  }
  addBook (name, author) {
    this.libros.push({
      nombre: name,
      autor: author
    });
  }
  getBookNames () {
    return this.libros.map(libro => libro.nombre)
  }
}

const usuario = new Usuario('Gonzalo', 'Martinez')

console.log(usuario.getFullName())

usuario.addMascota('perro')
usuario.addMascota('pez')
console.log(usuario.mascotas)

console.log(usuario.countMascotas())

usuario.addBook('Chamame', 'Leonardo Oyola')
usuario.addBook('¿por que los videojuegos pueden mejorar tu vida y cambiar el mundo?', 'Jane McGonigal')
console.log(usuario.libros)

console.log(usuario.getBookNames())