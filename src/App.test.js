import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('App', () => {
  test('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/title/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('switches tabs when clicked', () => {
    render(<App />);
    const uploadTab = screen.getByText(/uploadTab/i);
    const viewTab = screen.getByText(/viewTab/i);

    expect(uploadTab).toHaveClass('border-b-4 border-gold-400');
    fireEvent.click(viewTab);
    expect(viewTab).toHaveClass('border-b-4 border-gold-400');
  });

  test('toggles dark mode', () => {
    render(<App />);
    const darkModeButton = screen.getByText(/darkMode/i);
    const appContainer = darkModeButton.closest('div.min-h-screen');

    expect(appContainer).not.toHaveClass('dark');
    fireEvent.click(darkModeButton);
    expect(appContainer).toHaveClass('dark');
  });
});
