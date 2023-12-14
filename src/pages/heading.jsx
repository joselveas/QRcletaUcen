function Heading(props){
    return(
        <div className="content-heading">
            <div className="y-style">
                <div className="logo">
                    {props.logo1}
                </div>
                <div className="welcome">
                    {props.wel}                  
                </div>
                <div className="logo">
                    {props.logo2}
                </div>
            </div>
        </div>
    )
}

export default Heading;