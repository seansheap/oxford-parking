import { LocationItem, RetrictionTimes } from "../../../features/locations";
import { startEndtoComparable } from "./MapGoogle.util";

const addWeekToActiveTimes = (item: RetrictionTimes) => {
  if (!item) return { start: '1000', end: '1000' }
  const startTime = (parseInt(item.start.slice(0, 2)) + 7 * 24).toString().padStart(2, '0') + item.start.slice(2);
  const endTime = (parseInt(item.end.slice(0, 2)) + 7 * 24).toString().padStart(2, '0') + item.end.slice(2);
  return { start: startTime, end: endTime }
}

const nextRestrictionCalculation = (activeTimes: RetrictionTimes[], extraFree: number = 0, timeFrom: number = 0) => {
  const dayToHours = new Date().getDay() * 24;
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes() / 60;
  const timeNow = timeFrom || nowHour + nowMinute + dayToHours;

  const loopedActiveTimes = [...activeTimes, addWeekToActiveTimes(activeTimes[0])]
  let nextRestriction = 12

  for (let i = 0; i < loopedActiveTimes.length; i++) {
    const activeTime = loopedActiveTimes[i];
    const { startTime, endTime } = startEndtoComparable(activeTime.start, activeTime.end)
    if (timeNow > startTime && timeNow < endTime) {
      return Math.min((endTime - timeNow), extraFree)
    }
  };

  for (let i = 0; i < loopedActiveTimes.length; i++) {
    const activeTime = loopedActiveTimes[i];
    const { startTime, endTime } = startEndtoComparable(activeTime.start, activeTime.end)
    if (timeNow < startTime) {
      nextRestriction = Math.min((startTime - timeNow), nextRestriction) + extraFree
    }
  };
  return nextRestriction
}


const visitRestrictionCalculation = (activeTimes: RetrictionTimes[], extraFree: number = 0) => {
  const dayToHours = new Date().getDay() * 24;
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes() / 60;
  const timeNow = nowHour + nowMinute + dayToHours;

  const loopedActiveTimes = [...activeTimes, addWeekToActiveTimes(activeTimes[0])]
  let freeLength = 12
  let endTimeOfRestriction = 23.99

  loopedActiveTimes.forEach(activeTime => {
    const { startTime, endTime } = startEndtoComparable(activeTime.start, activeTime.end)
    if (timeNow > startTime && timeNow < endTime) {
      freeLength = Math.min((endTime - timeNow), extraFree)
      endTimeOfRestriction = endTime
    }
  });

  return { freeLength, endTimeOfRestriction }
}

export const checkFreeUntil = (item: LocationItem) => {
  let untilPay = 12
  let untilPermit = 12
  let untilVisit = 12
  if (item.visit && item.visit.limit) {
    const { freeLength, endTimeOfRestriction } = visitRestrictionCalculation(item.visit.activeTimes, item.visit.limit)
    if (freeLength < item.visit.limit) {

      untilVisit = nextRestrictionCalculation(item.visit.activeTimes, item.visit.limit, endTimeOfRestriction)

      if (item.pay) {
        untilPay = nextRestrictionCalculation(item.pay.activeTimes, 0, endTimeOfRestriction)
      }
      if (item.permit) {
        untilPermit = nextRestrictionCalculation(item.permit.activeTimes, 0, endTimeOfRestriction)
      }
      return freeLength + Math.min(untilPay, untilPermit, untilVisit)
    } else {
      return (freeLength)
    }
  } else {

    if (item.pay) {
      untilPay = nextRestrictionCalculation(item.pay.activeTimes, 0)
    }
    if (item.permit) {
      untilPermit = nextRestrictionCalculation(item.permit.activeTimes, 0)
    }

    return Math.min(untilPay, untilPermit)
  }


  // const time = searchParams?.get("t")
  // return new Date(new Date().getTime() - item.tempLimit * 1000 * 60 * 60) < (time ? new Date(time) : new Date(item.freeStart))
}