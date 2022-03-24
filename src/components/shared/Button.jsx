import PropTypes from "prop-types";


/**
 * Funktion zum Erstellen einer Button-Komponente
 * @param {Node} children - 
 * @param {String} version - Definiert die CSS-Klasse welche das spezifische Aussehen des Buttons definiert
 * @param {String} type - Spezifiziert das HTML-Attribut 
 * @param {Boolean} isDisabled - Definiert ob der Button aktiviert oder deaktiviert ist
 * @param {Function} onClick - Definiert das Verhalten beim Klicken
 * @returns {Component}
 */
function Button({children, version, type, isDisabled, onClick, style}) {
    return <button type={type} disabled={isDisabled} className={`btn btn-${version}`} onClick={onClick} style={style}>
        {children}
    </button>;
}

/**
 * Objekt welches die Standard-Eigenschaften der Button-Komponente definiert
 * falls durch Übergabeparameter nicht definiert
 */
Button.defaultProps = {
    version: "primary",
    type: "button",
    isDisabled: false
}

/**
 * Objekt welche die Datentypen für die Parameter der Buttonkomponente definiert
 */
Button.propTypes = {
    children: PropTypes.node,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button;