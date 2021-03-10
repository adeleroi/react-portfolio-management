import * as React from 'react'
import {Dialog, CircleButton} from './lib'
import {VisuallyHidden} from '@reach/visually-hidden'
import {DialogContent} from '@reach/dialog'



const ModalContext = React.createContext()

const Modal = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const ModalButtonOpen = ({children: child}) => {
    const [, setIsOpen] = React.useContext(ModalContext)
    return React.cloneElement(child, {onClick: () => setIsOpen(true)})
}

const ModalButtonClose = ({children: child}) => {
    const [, setIsOpen] = React.useContext(ModalContext)
    return React.cloneElement(child, {onClick: () => setIsOpen(false)})
}

const ModalContentBase = ({children, ...props}) => {
    const [isOpen, setIsOpen] = React.useContext(ModalContext)
    return (
        <Dialog style={{display: 'grid', placeItems: 'center'}} isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} >
            <DialogContent style={{maxWidth: '450px', borderRadius: '3px'}}>{children}</DialogContent>
        </Dialog>
        )
}

const ModalContents = ({children, ...props}) => {
    return (
        <ModalContentBase {...props}>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <ModalButtonClose>
                    <CircleButton>
                        <VisuallyHidden>Close</VisuallyHidden>
                        <span arria-label='hidden'>x</span>
                    </CircleButton>
                </ModalButtonClose>
            </div>
            {children}
        </ModalContentBase>
    )
}

export {
    Modal,
    ModalButtonClose,
    ModalButtonOpen,
    ModalContentBase,
    ModalContents,
    // ModalContext
}