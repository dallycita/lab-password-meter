import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MedidorContrasena from './MedidorContrasena'

describe('MedidorContrasena - componente', () => {
  // Tests de renderizado
  it('renderiza un input de tipo password', () => {
    render(<MedidorContrasena />)
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
  })

  it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
    render(<MedidorContrasena />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('el input es accesible por su label', () => {
    render(<MedidorContrasena />)
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
  })

  // Tests de comportamiento
  it('muestra "débil" al escribir una contraseña corta', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('muestra "media" al escribir 8+ caracteres sin números ni símbolos', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('muestra "fuerte" al escribir 8+ caracteres con al menos un número', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('muestra "muy fuerte" al escribir 8+ caracteres con número y símbolo', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdef1!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })

  it('vuelve a "vacía" al borrar toda la contraseña', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    const input = screen.getByLabelText(/contraseña/i)
    await user.type(input, 'abc')
    await user.clear(input)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  // Tests de edge cases
  it('exactamente 8 caracteres sin números NO es "débil"', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.queryByText('débil')).not.toBeInTheDocument()
  })

  it('exactamente 7 caracteres NO es "media"', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg')
    expect(screen.queryByText('media')).not.toBeInTheDocument()
  })

  it('solo símbolos con menos de 8 caracteres sigue siendo "débil"', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), '!@#')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('renderiza una barra de progreso', () => {
    render(<MedidorContrasena />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('la barra de progreso aumenta al pasar de "débil" a "fuerte"', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abc')
    const barraDebil = screen.getByRole('progressbar')
    const valorDebil = parseInt(barraDebil.getAttribute('aria-valuenow'))

    await user.clear(input)
    await user.type(input, 'abcdefg1')
    const barraFuerte = screen.getByRole('progressbar')
    const valorFuerte = parseInt(barraFuerte.getAttribute('aria-valuenow'))

    expect(valorFuerte).toBeGreaterThan(valorDebil)
  })

  it('muestra "muy fuerte" cuando hay 8+ chars, número, símbolo y mayúsculas mezcladas', async () => {
    const user = userEvent.setup()
    render(<MedidorContrasena />)
    await user.type(screen.getByLabelText(/contraseña/i), 'Abcdef1!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })
})