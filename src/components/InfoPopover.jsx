import { useEffect, useRef } from "react"

function InfoPopover({ id, activeInfo, setActiveInfo, children }) {
    const wrapperRef = useRef(null)
    const isOpen = activeInfo === id

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                isOpen &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setActiveInfo("")
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [isOpen, setActiveInfo])

    return (
        <span ref={wrapperRef} className="info-wrapper">
            <button
                type="button"
                className="info-icon"
                onClick={() => setActiveInfo(isOpen ? "" : id)}
                aria-label="More information"
            >
                ⓘ
            </button>

            {isOpen && (
                <span className="info-popover">
                    {children}
                </span>
            )}
        </span>
    )
}

export default InfoPopover