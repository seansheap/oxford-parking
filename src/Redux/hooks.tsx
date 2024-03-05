import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { FC, useEffect, useState } from 'react';
import theme from '../styles/theme';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



interface ViewportProps {
  size: 'lg' | 'md' | 'sm' | 'xs';
}
export const useViewport = () => {
  const breakpoints = theme.breakpoints

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const minSize = ({ size }: ViewportProps) => {
    const breakpointValue = breakpoints[size];
    if (width < breakpointValue) {
      return true
    }
    return false;
  }


  return {
    minWidth: minSize
  }
}