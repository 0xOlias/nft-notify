declare module 'slonik-interceptor-field-name-transformation' {
  import type { FieldType, InterceptorType } from 'slonik'

  type ConfigurationType = {
    format: 'CAMEL_CASE'
    test?: (field: FieldType) => boolean
  }

  export function createFieldNameTransformationInterceptor(configuration: ConfigurationType): InterceptorType
}

declare module 'slonik-interceptor-query-logging' {
  import type { InterceptorType } from 'slonik'

  type ConfigurationType = {
    logValues?: Boolean
  }

  export function createQueryLoggingInterceptor(configuration?: ConfigurationType): InterceptorType
}
