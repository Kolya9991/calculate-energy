import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CalcPage from "@/app/calc/page";


describe('Page', () => {
  it('renders a heading', () => {
    render(<CalcPage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toHaveTextContent('calc page');
    expect(heading).toBeInTheDocument();
  })
})
