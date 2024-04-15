import { render, screen } from '@testing-library/react';
import { GoogleMap } from './MapGoogle';
import { useGoogleMap } from './useMapGoogle';
import { useLocationList } from './useLocationList';
import { useViewport } from '../../../Redux/hooks';



jest.mock('./useMapGoogle', () => ({
  useGoogleMap: jest.fn(),
}));

// Mocking Redux hooks
jest.mock('../../../Redux/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
  useDebounce: jest.fn(),
  useViewport: jest.fn(),

}));

// Mocking the setFocusedLocationById action creator
jest.mock('../../../features/locations', () => ({
  setFocusedLocationById: jest.fn(),
}));

// Mocking useLocationList hook
jest.mock('./useLocationList', () => ({
  useLocationList: jest.fn(),
}));




type useGoogleMap = ReturnType<typeof useGoogleMap>;
describe('MapGoogle', () => {

  it('should render loading', () => {

    (useGoogleMap as jest.Mock).mockReturnValue({
      isLoading: true,
      defaultProps: {
        center: {
          lat: 51.7520,
          lng: -1.2577
        },
        zoom: 14
      },
      locations: [],
      selectedPoint: { lat: 0, lng: 0 },
      mapClick: jest.fn(),
      cordinates: { lat: 51.7520, lng: -1.2577 },
      zoom: 14,
      regionSelected: jest.fn()
    });

    render(<GoogleMap />);
    expect(screen.getByTestId('map-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  })

  it('should render map and searchbar', () => {

    (useLocationList as jest.Mock).mockReturnValue({
      isLoading: false,
      locations: [],
    });

    (useViewport as jest.Mock).mockReturnValue({
      minWidth: jest.fn(),
    });

    (useGoogleMap as jest.Mock).mockReturnValue({
      isLoading: false,
      defaultProps: {
        center: {
          lat: 51.7520,
          lng: -1.2577
        },
        zoom: 14
      },
      locations: [],
      selectedPoint: { lat: 0, lng: 0 },
      mapClick: jest.fn(),
      cordinates: { lat: 51.7520, lng: -1.2577 },
      zoom: 14,
      regionSelected: jest.fn()
    });

    render(<GoogleMap />);
    expect(screen.queryByTestId('map-loading')).not.toBeInTheDocument();
    expect(screen.getAllByRole('search')).toBeInTheDocument();
  })
})
