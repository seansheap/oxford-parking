import { RetrictionTimes } from "../../../features/locations";
import { numberToTime, startEndtoComparable } from "../MapGoogle/MapGoogle.util";

export const activeTimesToDays = (activeTimes: RetrictionTimes[] | undefined) => {

  const defualtReturn = { start: ['', '', '', '', '', '', ''], end: ['', '', '', '', '', '', ''] }
  if (!activeTimes) { return defualtReturn }


  const timeListStart = ['', '', '', '', '', '', '']
  const timeListEnd = ['', '', '', '', '', '', '']
  for (let index = 0; index < activeTimes.length; index++) {
    const { startTime, endTime } = startEndtoComparable(activeTimes[index].start, activeTimes[index].end)

    if (startTime >= 0 && startTime < 24) {
      timeListStart[0] = numberToTime(startTime)
      timeListEnd[0] = numberToTime(endTime)
    } else if (startTime >= 24 && startTime < 48) {
      timeListStart[1] = numberToTime(startTime - 24)
      timeListEnd[1] = numberToTime(endTime - 24)
    } else if (startTime >= 48 && startTime < 72) {
      timeListStart[2] = numberToTime(startTime - 48)
      timeListEnd[2] = numberToTime(endTime - 48)
    } else if (startTime >= 72 && startTime < 96) {
      timeListStart[3] = numberToTime(startTime - 72)
      timeListEnd[3] = numberToTime(endTime - 72)
    } else if (startTime >= 96 && startTime < 120) {
      timeListStart[4] = numberToTime(startTime - 96)
      timeListEnd[4] = numberToTime(endTime - 96)
    } else if (startTime >= 120 && startTime < 144) {
      timeListStart[5] = numberToTime(startTime - 120)
      timeListEnd[5] = numberToTime(endTime - 120)
    } else if (startTime >= 144 && startTime < 168) {
      timeListStart[6] = numberToTime(startTime - 144)
      timeListEnd[6] = numberToTime(endTime - 144)
    }
  }

  return { start: timeListStart, end: timeListEnd }
}

