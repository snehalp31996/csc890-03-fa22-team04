import { PropTypes } from 'prop-types';

const Dropdown = ({value, label, field,  data, placeholder, styleClass, onChange}) => {

    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return (
        <>
            <div className={`form-group ${styleClass}`}>
                
                <select required
                    value={value} 
                    className='form-control' 
                    onChange={handleChange}>
                    <option value="">{placeholder ? placeholder : 'Select a value'}</option>
                    {data.map((item, key) => (
                        <option 
                            key={key} 
                            value={item.value}> 
                            {item.label} 
                        </option>
                    ))}
                </select>
            </div>
            
        </>
    )
};

Dropdown.propTypes = {
    value: PropTypes.string,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    styleClass: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
    value: '',
    placeholder: '',
    selectClass: '',
};

export default Dropdown;    