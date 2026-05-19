# Medidor de Fortaleza de Contraseña

Laboratorio de TDD con React, Vite y Vitest.

## Instalación

```bash
npm install
```

## Correr los tests (modo watch)

```bash
npm test
```

## Correr los tests una sola vez

```bash
npm run test:run
```

## Generar reporte de cobertura

```bash
npm run coverage
```

## Modo desarrollo

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Flujo TDD seguido

1. Se configuró el proyecto con Vite, Vitest y React Testing Library desde cero.
2. Se escribieron **todos** los tests primero, cubriendo renderizado, comportamiento y edge cases.
3. Se hizo commit con los tests fallando (evidencia del flujo red-green-refactor).
4. Se implementó la lógica pura en `src/core/calcularFortaleza.js`.
5. Se implementó el componente `MedidorContrasena` en `src/ui/`.
6. Se corrieron los tests hasta que todos pasaron en verde.
7. Se refactorizó el CSS y la estructura sin romper tests.

## Estructura del proyecto

```
src/
  core/                         
    calcularFortaleza.js
    calcularFortaleza.test.js
  ui/                           

    MedidorContrasena.jsx
    MedidorContrasena.css
    MedidorContrasena.test.jsx
  App.jsx
  main.jsx
  setupTests.js
```