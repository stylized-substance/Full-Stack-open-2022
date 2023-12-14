import Button from 'react-bootstrap/Button'

const ButtonComponent = (variant, text) => {
  return (
    <Button variant={variant}>
      {text}
    </Button>
  )
}

export default ButtonComponent