import { LocationItem } from "../../../features/locations";
import theme from "../../../styles/theme";


export const handleApiLoaded = (locations: LocationItem[], regionSelected: any, map: any, maps: any) => {
  locations.forEach((item) => {
    const itemAndLongLat = [...item.longlat, ...item.longlat.slice().reverse()];
    const colour = item.visit?.limit ? theme.colourKey.visit : item.permit?.permitCode ? theme.colourKey.permit : item.pay?.pricePerHour ? theme.colourKey.pay : theme.colourKey.free
    new maps.Polygon({
      paths: item.area ? item.longlat : itemAndLongLat,
      strokeColor: colour,
      strokeOpacity: 0.6,
      strokeWeight: 5,
      clickable: true,
      map: map,
    }).addListener('click', () => regionSelected(item.id));

  })
}
export const startEndtoComparable = (start: string, end: string) => {
  const startHour = parseInt(start.split(":")[0]);
  const startMinute = parseInt(start.split(":")[1]) / 60;
  const startTime = startHour + startMinute;
  const endHour = parseInt(end.split(":")[0]);
  const endMinute = parseInt(end.split(":")[1]) / 60;
  const endTime = endHour + endMinute;
  return { startTime, endTime }
}


export const numberToTime = (start: number) => {
  const hour = Math.floor(start)
  const minute = Math.floor((start - hour) * 60)
  return `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`
}
