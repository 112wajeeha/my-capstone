
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolCard from '../components/ToolCard';

describe('ToolCard', () => {
  it('shows a loading message while reading notes', () => {
    render(<ToolCard state="input-streaming" />);

    expect(screen.getByText('Reading your notes...')).toBeInTheDocument();
  });

  it('shows an error and retries when Retry is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ToolCard
        state="output-error"
        errorText="Test extraction error"
        onRetry={onRetry}
      />
    );

    expect(
      screen.getByText("We couldn't verify the action items")
    ).toBeInTheDocument();
    expect(screen.getByText('Test extraction error')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('disables Retry when no retry handler is provided', () => {
    render(<ToolCard state="output-error" />);

    expect(screen.getByRole('button', { name: 'Retry' })).toBeDisabled();
  });

  it('shows a message when the tool result has an invalid format', () => {
    render(
      <ToolCard
        state="output-available"
        output={{ unexpected: true }}
      />
    );

    expect(
      screen.getByText("We couldn't read the tool result")
    ).toBeInTheDocument();
  });
});
