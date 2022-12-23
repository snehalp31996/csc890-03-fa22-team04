import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {

    const {ratingValue, rating, hover, onClick, onMouseEnter, onMouseLeave, onChange } = props;

  return (
    <div>
        <label>
            <input 
                type="radio" 
                name="userRating" 
                value={ratingValue} 
                onClick={onClick}
                onChange={onChange}
            /> 
            <FaStar
                className={ratingValue <= (hover || rating) ? "yellow" : "grey"}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={45}
                onMouseEnter={() => onMouseEnter(ratingValue)}
                onMouseLeave={() => onMouseLeave}
                data-testid='stars'
            /> 
        </label>
    </div>
  )
}

export default StarRating