import { renderHook } from '@testing-library/react';
import { useAppDispatch, useAppSelector, useDebounce } from '../../../Redux/hooks';
import { setFocusedLocationById } from '../../../features/locations';
import { useLocationList } from './useLocationList';
import { useGoogleMap } from './useMapGoogle';

// Mocking Redux hooks
jest.mock('../../../Redux/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
  useDebounce: jest.fn(),
}));


// Mocking the setFocusedLocationById action creator
jest.mock('../../../features/locations', () => ({
  setFocusedLocationById: jest.fn(),
}));

// Mocking useLocationList hook
jest.mock('./useLocationList', () => ({
  useLocationList: jest.fn(),
}));


describe('useGoogleMap', () => {
  beforeEach(() => {
    // Reset mock calls and values before each test
    jest.clearAllMocks();
  });

  it('returns default props when no focus location', () => {
    // Mocking useAppSelector to return no focused location
    (useAppSelector as jest.Mock).mockReturnValue({});

    // Mocking useLocationList hook
    (useLocationList as jest.Mock).mockReturnValue({
      isLoading: false,
      locations: [],
    });

    const { result } = renderHook(() => useGoogleMap({}));

    // Asserting the returned value
    expect(result.current).toEqual({
      defaultProps: {
        center: { lat: 51.7520, lng: -1.2577 },
        zoom: 14,
      },
      focusLocation: {},
      isLoading: false,
      locations: [],
      selectedPoint: { lat: 0, lng: 0 },
      mapClick: expect.any(Function),
      regionSelected: expect.any(Function),
      cordinates: { lat: 51.7520, lng: -1.2577 },
      zoom: 14,
    });
  });

  // Add more test cases as needed
});