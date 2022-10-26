import PropTypes from 'prop-types'

const Button = ({text, onClick}) => {

  return (
    <>
        <button 
            onClick={onClick} 
            style={{backgroundColor: color}} 
            className='btn btn-success btn-xs btn-center'
        >
            {text}
        </button>
    </>
  )
}

Button.defaultProps = {
    color: 'green',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button

