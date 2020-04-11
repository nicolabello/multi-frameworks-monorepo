export interface Route {
  path: string
  component: any, // TODO: find out correct type
  children?: Routes,
  params?: { [K: string]: any }
}

export type Routes = Route[]
