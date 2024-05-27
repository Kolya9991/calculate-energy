import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Page from "@/app/faq/page";

describe('Faq page', () => {
  it('renders the first paragraph', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toHaveTextContent('Часті питання (FAQ)');
    expect(heading).toBeInTheDocument();
  })

  it('toggles the first accordion item', () => {
    render(<Page />)

    // Get the accordion trigger button
    const accordionTrigger = screen.getByText('Як розраховується енергоефективність?');

    // Initially, the content should not be visible
    expect(screen.queryByText(/Енергоефективність розраховується шляхом/i)).not.toBeInTheDocument();

    // Click to expand the accordion
    fireEvent.click(accordionTrigger);

    // The content should now be visible
    expect(screen.getByText(/Енергоефективність розраховується шляхом/i)).toBeInTheDocument();

    // Click again to collapse the accordion
    fireEvent.click(accordionTrigger);

    // The content should now be hidden again
    expect(screen.queryByText(/Енергоефективність розраховується шляхом/i)).not.toBeInTheDocument();
  })
})
