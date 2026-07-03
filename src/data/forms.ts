import type { FormDefinition } from '../types/form'
import entrevistaCualitativa from './entrevistaCualitativa.json'

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
  
]
