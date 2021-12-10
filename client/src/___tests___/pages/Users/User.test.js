import { render, screen } from '@testing-library/react';
import React from 'react';
import { Users } from '../../../pages/Users';

describe('Users', () => {

    it('Users is render', () => {
        render(<Users />)
        expect(screen.findByText(/Добавить пользователя/i)).toBeInTheDocument()
    })
});
