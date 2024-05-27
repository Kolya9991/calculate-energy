import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CalcForm from '@/components/calc-form/CalcForm';
import { getDevices } from '@/actions/getDevices';
import { calculate } from '@/actions/calculate';

// Mock the external dependencies
jest.mock('@/actions/getDevices', () => ({
  getDevices: jest.fn(),
}));
jest.mock('@/actions/calculate', () => ({
  calculate: jest.fn(),
}));

const mockDevices = [
  { id: '1', nameDevice: 'Тостер', stepKw: '0.1', stepKwMax: '5' },
  { id: '2', nameDevice: 'Пилосос', stepKw: '0.2', stepKwMax: '10' },
];

describe('CalcForm Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', async () => {
    (getDevices as jest.Mock).mockResolvedValue(mockDevices);

    await act(async () => {
      render(<CalcForm />);
    });

    // Assert initial render state
    expect(screen.getByText("Назва пристрою")).toBeInTheDocument();
  });

  it('calculates kwMonth correctly', async () => {
    (getDevices as jest.Mock).mockResolvedValue(mockDevices);
    (calculate as jest.Mock).mockResolvedValue({ success: true });

    await act(async () => {
      render(<CalcForm />);
    });

    // Wait for devices to load
    await waitFor(() => screen.getByText('Тостер'));

    // Open the device dropdown and select 'Тостер'
    fireEvent.mouseDown(screen.getByText("Виберіть пристрій"));
    fireEvent.click(screen.getByText('Тостер'));

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Кількість/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Часи роботи/i), { target: { value: '5' } });

    // Open the period dropdown and select 'В місяць'
    fireEvent.mouseDown(screen.getByTestId('period'));
    fireEvent.click(screen.getByText('В місяць'));

    // Change the kW slider value
    const slider = screen.getByTestId('slider');
    // fireEvent.change(slider, { target: { value: '3' } });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText(/Розрахувати/i));
    });

  });


  it('shows error when no device is selected', async () => {
    // Mocking getDevices to resolve a value (adjust this based on your actual implementation)
    (getDevices as jest.Mock).mockResolvedValue(mockDevices);

    await act(async () => {
      render(<CalcForm />);
    });

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Кількість/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Часи роботи/i), { target: { value: '5' } });

    // Ensure the dropdown interaction is correct
    const periodDropdown = screen.getByTestId('period');
    fireEvent.mouseDown(periodDropdown);
    fireEvent.click(screen.getByText('В місяць'));

    // Ensure the slider interaction is correct
    const slider = screen.getByLabelText(/кВт/i);
    fireEvent.change(slider, { target: { value: '3' } });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText(/Розрахувати/i));
    });

    // Assert the error message
    await waitFor(() => expect(screen.getByText(/Виберіть пристрій/i)).toBeInTheDocument());
  });

});
