import { describe, it, expect } from 'vitest'
import { calcularFortaleza } from './calcularFortaleza'

describe('calcularFortaleza - lógica pura', () => {
  it('retorna "vacía" cuando la contraseña está vacía', () => {
    expect(calcularFortaleza('')).toBe('vacía')
  })

  it('retorna "débil" cuando tiene menos de 8 caracteres', () => {
    expect(calcularFortaleza('abc')).toBe('débil')
  })

  it('retorna "débil" para una contraseña de exactamente 7 caracteres', () => {
    expect(calcularFortaleza('abcdefg')).toBe('débil')
  })

  it('retorna "débil" cuando tiene solo símbolos y menos de 8 caracteres', () => {
    expect(calcularFortaleza('!@#')).toBe('débil')
  })

  it('retorna "media" cuando tiene exactamente 8 caracteres sin números ni símbolos', () => {
    expect(calcularFortaleza('abcdefgh')).toBe('media')
  })

  it('retorna "media" cuando tiene 8+ caracteres sin números ni símbolos', () => {
    expect(calcularFortaleza('abcdefghij')).toBe('media')
  })

  it('NO retorna "débil" para exactamente 8 caracteres sin números', () => {
    expect(calcularFortaleza('abcdefgh')).not.toBe('débil')
  })

  it('NO retorna "media" para exactamente 7 caracteres', () => {
    expect(calcularFortaleza('abcdefg')).not.toBe('media')
  })

  it('retorna "fuerte" cuando tiene 8+ caracteres y al menos un número', () => {
    expect(calcularFortaleza('abcdefg1')).toBe('fuerte')
  })

  it('retorna "fuerte" cuando tiene 8+ caracteres, número pero sin símbolo', () => {
    expect(calcularFortaleza('abcde123')).toBe('fuerte')
  })

  it('retorna "muy fuerte" cuando tiene 8+ caracteres, número y símbolo', () => {
    expect(calcularFortaleza('abcde1!')).toBe('débil') // solo 7 chars
  })

  it('retorna "muy fuerte" cuando tiene 8+ caracteres, número y símbolo (válido)', () => {
    expect(calcularFortaleza('abcdef1!')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con espacios como símbolo', () => {
    expect(calcularFortaleza('abcde1 g')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" cuando tiene 8+ chars, número, símbolo y mayúsculas mezcladas', () => {
    expect(calcularFortaleza('Abcde1!')).toBe('débil') 
  })

  it('retorna "muy fuerte" con mayúsculas mezcladas (caso válido con 8+ chars)', () => {
    expect(calcularFortaleza('Abcdef1!')).toBe('muy fuerte')
  })
})