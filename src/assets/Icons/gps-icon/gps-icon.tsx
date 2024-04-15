import { ReactComponent as GpsSvg } from './gps-icon.svg';

interface Props {
  active: Boolean
}

export const GpsIcon: React.FC<Props> = ({ active }) => {
  return (
    <GpsSvg width={24} height={24} fill={active ? 'red' : 'black'} />
  )
}