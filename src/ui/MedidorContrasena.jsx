import { useState } from 'react'
import { calcularFortaleza } from '../core/calcularFortaleza'
import './MedidorContrasena.css'

const NIVELES = {
  'vacía': 0,
  'débil': 25,
  'media': 50,
  'fuerte': 75,
  'muy fuerte': 100,
}

const COLORES = {
  'vacía': '#d1d5db',
  'débil': '#ef4444',
  'media': '#f59e0b',
  'fuerte': '#3b82f6',
  'muy fuerte': '#22c55e',
}

export default function MedidorContrasena() {
  const [contrasena, setContrasena] = useState('')
  const fortaleza = calcularFortaleza(contrasena)
  const porcentaje = NIVELES[fortaleza]
  const color = COLORES[fortaleza]

  return (
    <div className="medidor-wrapper">
      <label htmlFor="campo-contrasena">Contraseña</label>
      <input
        id="campo-contrasena"
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <div
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Nivel de seguridad"
        className="barra-contenedor"
      >
        <div
          className="barra-relleno"
          style={{ width: `${porcentaje}%`, backgroundColor: color }}
        />
      </div>

      <p className="etiqueta-fortaleza" style={{ color }}>
        {fortaleza}
      </p>
    </div>
  )
}