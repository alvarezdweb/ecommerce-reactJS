
const Icon = ({icon, className}) => {
    return (
        <i 
            className={`fas fa-${icon} ${className}`}
        ></i>
    );
}

export default Icon;