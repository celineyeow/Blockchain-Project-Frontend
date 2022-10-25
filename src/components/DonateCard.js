const DonateCard = ({location, title, description}) => {
    return(
        <div style={{backgroundColor: "#384455"}}>
            <p>{location}</p>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}

export default DonateCard;