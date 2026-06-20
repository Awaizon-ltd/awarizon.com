declare module 'react-simple-maps' {
  import type { ReactNode, SVGProps, MouseEvent } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    style?: React.CSSProperties
    className?: string
    children?: ReactNode
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element

  export interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: Geography[] }) => ReactNode
  }
  export interface Geography {
    rsmKey: string
    type: string
    properties: Record<string, unknown>
    geometry: object
  }
  export function Geographies(props: GeographiesProps): JSX.Element

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
  }
  export function Geography(props: GeographyProps): JSX.Element

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
    onMouseEnter?: (event: MouseEvent<SVGGElement>) => void
    onMouseLeave?: (event: MouseEvent<SVGGElement>) => void
    onClick?: (event: MouseEvent<SVGGElement>) => void
    className?: string
  }
  export function Marker(props: MarkerProps): JSX.Element

  export interface LineProps extends SVGProps<SVGPathElement> {
    from: [number, number]
    to: [number, number]
    coordinates?: [number, number][]
    stroke?: string
    strokeWidth?: number
    strokeOpacity?: number
    strokeDasharray?: string
    strokeLinecap?: string
    fill?: string
    style?: React.CSSProperties
  }
  export function Line(props: LineProps): JSX.Element

  export interface AnnotationProps {
    subject: [number, number]
    dx?: number
    dy?: number
    children?: ReactNode
  }
  export function Annotation(props: AnnotationProps): JSX.Element
}
