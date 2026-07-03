import type { FormDefinition } from '../types/form'
import entrevistaCualitativa from './entrevistaCualitativa.json'
import moduloCapturaCuantitativa from './moduloCapturaCuantitativa.json'

export interface FormRouteEntry {
  path: string
  menuTitle: string
  menuDescription?: string
  form: FormDefinition
}

export const forms: FormRouteEntry[] = [
  {
    path: '/DiagnosticoTecnicas',
    menuTitle: 'Diagnóstico de Técnicas de Enseñanza',
    menuDescription:
      'Entrevista semiestructurada para docentes del programa USAER 45J (fase de diagnóstico pre-implementación).',
    form: entrevistaCualitativa as FormDefinition,
  },
  {
    path: '/CapturaCuantitativa',
    menuTitle: 'Módulo de Captura Cuantitativa',
    menuDescription:
      'Registro por alumno/sesión: técnica aplicada, calificaciones de lectura y matemáticas, y conducta.',
    form: moduloCapturaCuantitativa as FormDefinition,
  },
]
