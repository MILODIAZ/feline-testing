function ModHeader(props) {
    return (
        <div >
            <p>Fecha del pedido: {props.fechaPedido}</p>
            <p>Fecha de llegada: {props.fechaLlegada}</p>
            <p>Días de retrasos: {props.diasRestantes}</p>
        </div >
    )
}
export default ModHeader;