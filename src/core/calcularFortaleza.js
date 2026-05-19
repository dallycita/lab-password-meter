/**
 * Calcula la fortaleza de una contraseña.
 * @param {string} contrasena
 * @returns {'vacía'|'débil'|'media'|'fuerte'|'muy fuerte'}
 */
export function calcularFortaleza(contrasena) {
  if (contrasena.length === 0) return 'vacía'
  if (contrasena.length < 8) return 'débil'

  const tieneNumero = /[0-9]/.test(contrasena)
  const tieneSimbolo = /[^a-zA-Z0-9]/.test(contrasena)

  if (tieneNumero && tieneSimbolo) return 'muy fuerte'
  if (tieneNumero) return 'fuerte'

  return 'media'
}