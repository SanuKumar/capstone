import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className='loader'>
      <Spinner animation="border" size="xl" />
    </div>
  )
}

export default Loader;