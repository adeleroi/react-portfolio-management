import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
    Modal,
    ModalButtonOpen,
    ModalContents
} from '../modal'


test('open and close', () => {
    const textContent = "testing content"
    const btnName = "Open"
    const modalTitle = "Modal title"
    const label = "Modal Label"
    render(
        <Modal>
            <ModalButtonOpen>
                <button>{btnName}</button>
            </ModalButtonOpen>
            <ModalContents aria-label={label} title={modalTitle}>
                <div>{textContent}</div>
            </ModalContents>
        </Modal>
    )
    userEvent.click(screen.getByRole('button', {name: /open/i}))
    
    expect(screen.queryByRole('button', {name: /close/i})).toBeInTheDocument()
    const modal =  screen.queryByLabelText(/modal label/i)
    // expect(modal).toHaveTextContent(textContent)
    
    userEvent.click(screen.getByRole('button', {name: /close/i}))
    
    expect(modal).not.toBeInTheDocument()
    expect(screen.getByRole('button', {name: /open/i})).toBeInTheDocument()
    
    screen.debug()
})