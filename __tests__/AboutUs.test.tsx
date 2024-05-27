import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from "@/app/about-us/page";

describe('About us', () => {
  it('renders the first paragraph', () => {
    render(<Page />)

    const paragraphText = 'Оптимізуйте енергоспоживання ваших пристроїв з нашою інформаційною системою - точні розрахунки та інтуїтивний інтерфейс для підвищення енергоефективності.';
    const paragraph = screen.getByText(paragraphText).closest('p');

    expect(paragraph).toHaveTextContent(paragraphText);
    expect(paragraph).toBeInTheDocument();
  })
})
