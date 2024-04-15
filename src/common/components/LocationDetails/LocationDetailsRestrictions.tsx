import { useEffect, useState } from "react";
import { HorizontalWrapper, HorizontalWrapperBasic, HorizontalWrapperMin } from "../../wrapper";
import { FreeRestriction, PayRestriction, PermitRestriction, VisitRestriction } from "../../../features/locations";
import { activeTimesToDays } from "./Restriction.util";
import { RestrictionWrapper, TimeSelectWrapper } from "./LocationDetails.styled";

interface LocationDetailsRestrictionsProps {
    setVisit: Function;
    setPermit: Function;
    setPay: Function;
    setFree: Function;
    visit: VisitRestriction | undefined;
    permit: PermitRestriction | undefined;
    pay: PayRestriction | undefined;
    free: FreeRestriction | undefined;

}

const LocationDetailsRestrictions = ({ setPay, setPermit, setVisit, setFree, visit, permit, pay, free }: LocationDetailsRestrictionsProps) => {
    const [restrictionParam, setRestrictionParam] = useState('');
    const [restrictionSection, setRestrictionSection] = useState(0)
    const [daySection, setDaySection] = useState(0)
    const [currentStartTime, setCurrentStartTime] = useState(['', '', '', '', '', '', '']);
    const [currentEndTime, setCurrentEndTime] = useState(['', '', '', '', '', '', '']);
    const titles = ['Visit', 'Permit', 'Pay', 'Free']
    const restrictions = [visit, permit, pay, free]

    useEffect(() => {
        switch (restrictionSection) {
            case 0:
                setRestrictionParam(visit?.limit ? visit.limit.toString() : '')
                break;
            case 1:
                setRestrictionParam(permit?.permitCode ? permit.permitCode : '')
                break;
            case 2:
                setRestrictionParam(pay?.pricePerHour ? pay.pricePerHour.toString() : '')
                break;

            default:
        }
        const { start, end } = activeTimesToDays(restrictions[restrictionSection]?.activeTimes)
        setCurrentStartTime(start)
        setCurrentEndTime(end)
    }, [restrictionSection, pay, permit, visit, free]);


    const handleSubmit = () => {
        const activeTimes = []
        for (let index = 0; index < currentStartTime.length; index++) {
            if (currentStartTime[index] === '00:00' && currentEndTime[index] === '00:00') continue
            const startTime = (parseInt(currentStartTime[index].slice(0, 2)) + index * 24).toString().padStart(2, '0') + currentStartTime[index].slice(2);
            const endTime = (parseInt(currentEndTime[index].slice(0, 2)) + index * 24).toString().padStart(2, '0') + currentEndTime[index].slice(2);
            activeTimes.push({ start: startTime, end: endTime })
        }
        switch (restrictionSection) {
            case 0:
                setVisit({ activeTimes: activeTimes, limit: parseFloat(restrictionParam) });
                break;
            case 1:
                setPermit({ activeTimes: activeTimes, permitCode: restrictionParam });
                break;
            case 2:
                setPay({ activeTimes: activeTimes, pricePerHour: parseFloat(restrictionParam) });
                break;
            case 3:
                setFree({ activeTimes: activeTimes });
                break;
            default:
                console.log('error')
                break;
        }
    }
    const handleSetStartTime = (time: string) => {
        const temp = [...currentStartTime]
        temp[daySection] = time
        setCurrentStartTime(temp)

    }
    const handleSetEndTime = (time: string) => {
        const temp = [...currentEndTime]
        temp[daySection] = time
        setCurrentEndTime(temp)
    }
    const handleDuplicateTime = () => {
        const start = currentStartTime[daySection]
        const end = currentEndTime[daySection]
        setCurrentStartTime([start, start, start, start, start, start, start])
        setCurrentEndTime([end, end, end, end, end, end, end])
    }

    const restictionSectionData = () => {
        switch (restrictionSection) {
            case 0: return (
                <div>
                    <label htmlFor="limit" >Length of time</label>
                    <input type="text" name="limit" value={restrictionParam || ''} onChange={(e) => { console.log(e.target.value); setRestrictionParam(e.target.value) }} />
                    {timeSelect()}
                </div>)

            case 1: return (
                <div>
                    <label htmlFor="permit-code" >Permit Code</label>
                    <input type="text" name="permit-code" value={restrictionParam || ''} onChange={(e) => setRestrictionParam(e.target.value)} />
                    {timeSelect()}
                </div>)
            case 2: return (
                <div>
                    <label htmlFor="price-per-hour" >Price per Hour</label>
                    <input type="text" name="price-per-hour" value={restrictionParam || ''} onChange={(e) => setRestrictionParam(e.target.value)} />
                    {timeSelect()}
                </div>)
            case 3: return (
                <div>
                    {timeSelect()}
                </div>)
            default: return <div>{timeSelect()}</div>

        }
    }
    const defualtTimeRange = () => {
        handleSetStartTime('08:00')
        handleSetEndTime('18:30')
    }
    const allDayRange = () => {
        handleSetStartTime('00:00')
        handleSetEndTime('23:59')
    }
    const clearDayRange = () => {
        handleSetStartTime('')
        handleSetEndTime('')
    }
    const timeSelect = () => {
        return (
            <TimeSelectWrapper>
                <div className="time-select-wrapper">
                    <label htmlFor="start-time" >start time</label>
                    <input type="time" name="start-time" value={currentStartTime[daySection] || ''} onChange={(e) => handleSetStartTime(e.target.value)} />
                    <label htmlFor="end-time" >end time</label>
                    <input type="time" name="end-time" value={currentEndTime[daySection]} onChange={(e) => handleSetEndTime(e.target.value)} />
                </div>
                <div className="time-button-wrapper">
                    <button type="button" onClick={defualtTimeRange}>Defualt </button>
                    <button type="button" onClick={allDayRange}>All Day</button>
                    <button type="button" onClick={clearDayRange}>Clear Day</button>
                </div>
            </TimeSelectWrapper>
        )
    }
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return (
        <RestrictionWrapper onBlur={handleSubmit}>
            <HorizontalWrapper>
                <button disabled={restrictionSection === 0} type="button" onClick={() => { handleSubmit(); setRestrictionSection(restrictionSection - 1) }}> <span>&#9668;</span> </button>
                <h4>{titles[restrictionSection]}</h4>
                <button disabled={restrictionSection === restrictions.length - 1} type="button" onClick={() => { handleSubmit(); setRestrictionSection(restrictionSection + 1) }}><span>&#9658;</span>  </button>
                <button type="button" onClick={handleSubmit}> Save </button>
            </HorizontalWrapper>

            {restictionSectionData()}
            <HorizontalWrapperMin>
                {days.map((day, idx) => (
                    <button key={idx} className={`day-button ${currentStartTime[idx] !== '' && currentEndTime[idx] !== '' && "day-button-active"} `} disabled={daySection === idx} type="button" onClick={() => setDaySection(idx)}> {day} </button>
                ))}

            </HorizontalWrapperMin>
            <button type="button" onClick={handleDuplicateTime}> Duplicate to all days  </button>

        </RestrictionWrapper>
    )
}

export default LocationDetailsRestrictions;