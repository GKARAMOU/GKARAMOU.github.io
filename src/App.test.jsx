import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import App from './App'

describe('portfolio', () => {
  it('presents the professional profile and flagship project', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /i build reliable software at the intersection of backend engineering and ai/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /supplypilot — operations command center/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /careerflow — job search command center/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('2022 — September 2025')).toBeInTheDocument()
    expect(screen.getByText(/based in greece and open to remote/i)).toBeInTheDocument()
    expect(screen.getByRole('link', {name: /download cv/i})).toBeInTheDocument()
  })

  it('uses LinkedIn as the public contact method without exposing email', () => {
    const {container} = render(<App />)

    expect(container.querySelector('a.secondary')).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/in/'),
    )
    expect(container.querySelector('a.contactLink')).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/in/'),
    )
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument()
    expect(container.textContent).not.toMatch(/@/)
  })
})
