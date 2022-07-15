// log specific events happening.
interface EventParams {
  action: string;
  params: any;
}
export const event = ({ action, params }:EventParams) => {
  window.gtag('event', action, params)
}
