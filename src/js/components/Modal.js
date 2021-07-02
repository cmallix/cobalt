import spinner from '../../img/loading2.gif';

export default function Modal(props) {
    return (
        <div className="modal">
            <img src={spinner} alt='spinner'/>
            <p>{props.text}</p>
        </div>
    )
}
