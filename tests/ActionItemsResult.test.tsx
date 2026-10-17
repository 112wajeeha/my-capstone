
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ActionItemsResult from '../components/ActionItemsResult';

describe('ActionItemsResult', () => {
  it('displays the action item and its owner and deadline', () => {
    render(
      <ActionItemsResult
        items={[
          {
            task: 'Send the project report',
            owner: 'Sara',
            deadline: 'Friday',
            sourceSentence: 'Sara will send the project report by Friday.',
            verified: true,
          },
        ]}
        verifiedCount={1}
        totalCount={1}
      />
    );

    expect(screen.getByText('Action items')).toBeInTheDocument();
    expect(screen.getByText('Send the project report')).toBeInTheDocument();
    expect(screen.getByText('Owner: Sara')).toBeInTheDocument();
    expect(screen.getByText('Deadline: Friday')).toBeInTheDocument();
  });

  it('shows fallback text when owner and deadline are missing', () => {
    render(
      <ActionItemsResult
        items={[
          {
            task: 'Review the notes',
            sourceSentence: 'The notes need review.',
            verified: false,
          },
        ]}
        verifiedCount={0}
        totalCount={1}
      />
    );

    expect(screen.getByText('Owner: Not stated')).toBeInTheDocument();
    expect(screen.getByText('Deadline: Not stated')).toBeInTheDocument();
  });

  it('shows the correct verification status', () => {
    render(
      <ActionItemsResult
        items={[
          {
            task: 'Confirm the agenda',
            sourceSentence: 'The agenda must be confirmed.',
            verified: true,
          },
          {
            task: 'Book the room',
            sourceSentence: 'Someone needs to book the room.',
            verified: false,
          },
        ]}
        verifiedCount={1}
        totalCount={2}
      />
    );

    expect(screen.getByText(/Verified source/)).toBeInTheDocument();
    expect(screen.getByText(/Not verified/)).toBeInTheDocument();
    expect(
      screen.getByText('1 of 2 source sentences verified')
    ).toBeInTheDocument();
  });


  it('displays zero counts when there are no action items', () => {
    render(
      <ActionItemsResult
        items={[]}
        verifiedCount={0}
        totalCount={0}
      />
    );

    expect(screen.getByText('Action items')).toBeInTheDocument();
    expect(
      screen.getByText('0 of 0 source sentences verified')
    ).toBeInTheDocument();
    expect(screen.getByText(/0\s*items/i)).toBeInTheDocument();
   
  });
})