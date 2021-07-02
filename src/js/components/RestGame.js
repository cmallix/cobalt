export default function RestGame(props) {
    return (
        <>
            <p className='errorMsg'>You are out of clicks.<br/>Submit your score or play again.</p>
            <button className="submitBtn" type="submit" onClick={props.clickEvt}>
                Play again
            </button>
        </>
    )
}
