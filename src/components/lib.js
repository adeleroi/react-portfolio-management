import * as React from 'react'
import {DialogOverlay as ReachDialog} from '@reach/dialog'
import "@reach/dialog/styles.css"
import styled from 'styled-components'

const GreenRed = styled.div`
  .green{
      color: green;
      font-size: 1.5rem;
      margin-right: 5px; 
  }
  .red{
      color: red;
      font-size: 1.5rem;
      margin-right: 5px; 
  }
  .action-link{
      text-decoration: none;
  }
`

const Spiner = () => {
    return (
        <>
            <h1>
                <span className="icon-spinner9" style={{color: 'rgb(36, 36, 114)'}}></span>
                &nbsp; Loading
            </h1>
        </>
    )
}

const FullPageSpiner = () => {
    return (
        <div style={{height: '100vh', display: 'grid', placeItems: 'center'}}>
            <h1>
                <span className="icon-spinner9" style={{color: 'rgb(36, 36, 114)'}}></span>
                &nbsp; Loading
            </h1>
        </div>
    )
}

const actionBtnStyle = (action) => (
    {
        textDecoration: "none",
        color: action === 'buy' ? 'white' : 'rgb(36, 36, 114)',
        backgroundColor: action === 'buy' ? 'rgb(36, 36, 114)' : 'white',
        border: '1px solid blue',
        borderRadius: '3px',
        height: '30px',
        width: '60px',
        fontSize: '1.2rem',
        display: 'grid',
        placeItems: 'center'
    }
)

const Dialog = styled(ReachDialog)`
        ${'' /* boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)'; */}
`

// const Dialog = styled(ReachDialog)(
//     {

//         Width: '450px',
//         borderRadius: '3px',
//         paddingBottom: '3.5em',
//         boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
//     },
// )

const CircleButton = styled.button(
    {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        border: '1px solid transparent',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '15px',
        outline: 'none'

    }
)

const btnVariants = {
    primary: {
        color: 'white',
        backgroundColor: 'rgb(36, 36, 114)'
    },
    secondary: {
        color: 'rgb(36, 36, 114)',
        backgroundColor: 'white'
    }
}

const ActionButton = styled.button(
    {
        border: '1px solid blue',
        borderRadius: '3px',
        height: '30px',
        width: '60px',
        fontSize: '1.2rem',
        cursor: 'pointer'
    },
    ({variant='primary'}) => btnVariants[variant]
)

const SubmitActionButton = styled.button(
    {
        border: '1px solid blue',
        borderRadius: '3px',
        height: '40px',
        width: '150px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginTop: '15px'
    },
    ({variant='primary'}) => btnVariants[variant]
)

const FormGroup = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    marginTop: '20px',
    fontSize: '16px'
})

export {
    Spiner,
    FullPageSpiner,
    actionBtnStyle,
    Dialog,
    CircleButton,
    ActionButton,
    FormGroup,
    SubmitActionButton,
    GreenRed
}